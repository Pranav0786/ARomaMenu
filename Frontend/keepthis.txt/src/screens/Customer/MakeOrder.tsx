import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';

export default function MakeOrder() {
  const [tableNumber, setTableNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handlePlaceOrder = async () => {
    if (!tableNumber.trim()) {
      Alert.alert('Please enter a valid table number');
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      console.log("Ayaya token", token);

      const res = await axios.post(
        `${BASE_URL}/order/placeOrder`,
        { tableNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      if (res.data.success) {
        Alert.alert('Order placed successfully!');
        navigation.navigate('CustomeHome'); 
      } else {
        Alert.alert('Failed to place order', res.data.message);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      Alert.alert('Error placing order', err.response?.data?.message || err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        <Text style={styles.heading}>🧾 Final Step</Text>
        <Text style={styles.label}>Enter Table Number:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 5"
          value={tableNumber}
          onChangeText={setTableNumber}
        />
        <TouchableOpacity
          style={styles.placeOrderBtn}
          onPress={handlePlaceOrder}
          disabled={loading}
        >
          <Text style={styles.btnText}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  placeOrderBtn: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
