import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';

type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

type RootStackParamList = {
  AddToCart: { foodItem?: any };
  Payment: { cartItems: CartItem[]; totalPrice: number };
};

type AddToCartScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AddToCart'>;
};

export default function AddToCartScreen({ navigation }: AddToCartScreenProps) {
  const route = useRoute<RouteProp<RootStackParamList, 'AddToCart'>>();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCart = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`${BASE_URL}/cart/getAllCartItems`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        const fetchedItems: CartItem[] = res.data.items.map((item: any) => ({
          id: item.food._id || item._id,
          name: item.food.title || item.name,
          price: item.food.price || item.price,
          imageUrl: item.food.imageurl || item.imageUrl,
          quantity: item.quantity,
        }));
        setCartItems(fetchedItems);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (route.params?.foodItem) {
      const newItem = route.params.foodItem;
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === newItem._id);
        if (existingItem) {
          return prevItems.map(item =>
            item.id === newItem._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [
          ...prevItems,
          {
            id: newItem._id,
            name: newItem.title,
            price: newItem.price,
            imageUrl: newItem.imageurl,
            quantity: 1,
          },
        ];
      });
    }
  }, [route.params?.foodItem]);

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const updateQuantity = (id: string, quantity: number) => {
    const validQuantity = Math.max(1, quantity);
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: validQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Your cart is empty!');
      return;
    }
    navigation.navigate('MakeOrder', {
      cartItems,
      totalPrice: getTotalPrice(),
    });
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.price}</Text>
        <View style={styles.quantityWrapper}>
          <Text style={styles.quantityLabel}>Qty:</Text>
          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric"
            value={item.quantity.toString()}
            onChangeText={text => updateQuantity(item.id, parseInt(text) || 1)}
          />
        </View>
        <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
          <Text style={styles.removeBtn}>🗑 Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.heading}>🛒 Your Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id}
          renderItem={renderCartItem}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ₹{getTotalPrice()}</Text>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>PROCEED TO PAYMENT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#888' },
  listContainer: { paddingBottom: 120 },
  itemCard: {
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 6,
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    elevation: 2,
  },
  itemImage: { width: 90, height: 90, borderRadius: 10 },
  itemDetails: { flex: 1, marginLeft: 10 },
  itemName: { fontSize: 18, fontWeight: '600' },
  itemPrice: { fontSize: 16, color: '#555', marginTop: 4 },
  quantityWrapper: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  quantityLabel: { fontSize: 14 },
  quantityInput: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 50,
    padding: 4,
    borderRadius: 6,
    textAlign: 'center',
  },
  removeBtn: { color: '#d00', marginTop: 8 },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 16,
  },
  totalText: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  checkoutBtn: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
