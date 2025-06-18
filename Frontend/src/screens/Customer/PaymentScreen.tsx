import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

const PaymentScreen = ({ navigation, route }: any) => {
  const cartItems = route?.params?.cartItems || [];
  const totalPrice = route?.params?.totalPrice || 0;

  const handleProceedPayment = () => {
    Alert.alert(
      'Payment Successful',
      'Your payment was successful. Thank you for your purchase!',
      [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Proceed to Payment</Text>

      <View style={styles.orderSummary}>
        <Text style={styles.subHeading}>Order Summary</Text>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        ) : (
          cartItems.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>₹{item.price} x {item.quantity}</Text>
              <Text style={styles.itemTotal}>
                Total: ₹{item.price * item.quantity}
              </Text>
            </View>
          ))
        )}
        <Text style={styles.total}>Total Price: ₹{totalPrice}</Text>
      </View>

      <Text style={styles.subHeading}>Select Payment Method</Text>

      <View style={styles.paymentOptions}>
        <TouchableOpacity style={styles.paymentButton}>
          <Text style={styles.paymentButtonText}>Credit/Debit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentButton}>
          <Text style={styles.paymentButtonText}>Net Banking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentButton}>
          <Text style={styles.paymentButtonText}>Cash on Delivery</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={handleProceedPayment}
      >
        <Text style={styles.checkoutButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  orderSummary: {
    marginBottom: 30,
  },
  subHeading: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
  },
  itemCard: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#555',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  emptyCartText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 10,
  },
  paymentOptions: {
    marginVertical: 20,
  },
  paymentButton: {
    backgroundColor: 'transparent',
    borderBlockColor: '#ccc',
    borderWidth: 1,
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#ff7f11',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
