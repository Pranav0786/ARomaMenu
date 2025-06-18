import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import axios from "axios";
import { BASE_URL } from '@env';

export default function FoodScreen({ route }: any) {
  const { food } = route.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const offPercentage = food.previousPrice
    ? Math.round(
      ((food.previousPrice - food.price) / food.previousPrice) * 100
    )
    : 0;

    const handleAddToCart = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Fetch token from storage
    
        if (!token) {
          Alert.alert("Authentication Error", "User not logged in");
          return;
        }
    
        const response = await axios.post(
          `${BASE_URL}/cart/addtocart`,
          {
            items: [
              {
                food: food._id,
                quantity: 1,
              },
            ],
            totalAmount: food.price,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token in header
            },
          }
        );
    
        if (response.data.success) {
          Alert.alert("Success", "Item added to cart", [
            {
              text: "OK",
              onPress: () => navigation.navigate("AddToCart", { foodItem: food }),
            },
          ]);
        } else {
          Alert.alert("Error", response.data.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to add item to cart");
      }
    };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.productName}>{food.title}</Text>

        <Image source={{ uri: food.imageurl }} style={styles.productImage} resizeMode="cover" />

        <View style={styles.tagRow}>
          <Text style={[styles.tagText, food.isVeg ? styles.veg : styles.nonVeg]}>
            {food.isVeg ? "Veg" : "Non-Veg"}
          </Text>
          <Text style={styles.ratingText}>⭐ {food.rating} ({food.reviews} reviews)</Text>
        </View>

        <View style={styles.viewButtonWrapper}>
          {food.ARmodelUrl?.trim() !== "" && (
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => navigation.navigate("WorldAR", { modelUrl: food.ARmodelUrl })}
            >
              <Icon name="camera-outline" size={20} color="#0e4db3" style={styles.arIcon} />
              <Text style={styles.viewButtonText}>VIEW IN AR MODE</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.priceRow}>
          {food.previousPrice && (
            <Text style={styles.discountText}>-{offPercentage}%</Text>
          )}
          <Text style={styles.priceText}>
            <Text style={styles.dollar}>₹</Text>
            {food.price}
          </Text>
        </View>

        {food.previousPrice && (
          <Text style={styles.previousPrice}>MRP: ₹{food.previousPrice}</Text>
        )}

        <Text style={styles.description}>{food.description}</Text>

        {food.spiceLevel && (
          <>
            <Text style={styles.subHeading}>🌶 Spice Level:</Text>
            <Text style={styles.infoText}>{food.spiceLevel}</Text>
          </>
        )}

        {food.speciality && (
          <>
            <Text style={styles.subHeading}>👨‍🍳 Speciality:</Text>
            <Text style={styles.infoText}>{food.speciality}</Text>
          </>
        )}
        {food.ingredients && (
          <>
            <Text style={styles.subHeading}>🧾 Ingredients:</Text>
            <Text style={styles.infoText}>{food.ingredients}</Text>
          </>
        )}

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartButtonText}>ADD TO CART</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff8f3",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  productName: {
    color: "#333",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productImage: {
    height: 250,
    width: "100%",
    borderRadius: 10,
  },
  tagRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  tagText: {
    fontSize: 13,
    fontWeight: "600",
  },
  veg: {
    color: "green",
  },
  nonVeg: {
    color: "red",
  },
  ratingText: {
    color: "#f39c12",
    fontWeight: "600",
  },
  viewButtonWrapper: {
    alignItems: "center",
    marginVertical: 20,
  },
  viewButton: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#0e4db3",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  arIcon: {
    marginRight: 8,
  },
  viewButtonText: {
    color: "#0e4db3",
    fontSize: 14,
    fontWeight: "bold",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  discountText: {
    fontSize: 28,
    color: "#e53935",
  },
  priceText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  dollar: {
    fontSize: 20,
  },
  previousPrice: {
    color: "gray",
    textDecorationLine: "line-through",
    fontSize: 14,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: "#555",
    marginVertical: 10,
  },
  subHeading: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#555",
  },
  addToCartButton: {
    backgroundColor: '#ff7f11',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  addToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailsSection: {
    marginTop: 10,
    gap: 14,
    paddingBottom: 40,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  detailKey: {
    fontWeight: "600",
    color: "#444",
    fontSize: 15,
    textTransform: "capitalize",
  },
  detailValue: {
    fontSize: 15,
    color: "#333",
    textAlign: "right",
    maxWidth: "60%",
  },
});