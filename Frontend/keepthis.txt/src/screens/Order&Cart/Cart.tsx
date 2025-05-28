// screens/Cart.tsx
import React, { useContext } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { CartContext } from "./CartContext";

const Cart = ({ navigation }) => {
    const { cartItems, totalAmount, placeOrder } = useContext(CartContext);

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.food._id}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 15 }}>
                        <Text>{item.food.title} x {item.quantity}</Text>
                        <Text>Price: ₹{item.food.price}</Text>
                    </View>
                )}
            />
            <Text style={{ fontSize: 20 }}>Total: ₹{totalAmount}</Text>
            <Button title="Place Order" onPress={placeOrder} />
        </View>
    );
};

export default Cart;
