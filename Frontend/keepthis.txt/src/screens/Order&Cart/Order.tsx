// screens/Order.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import axios from "axios";

const OrderScreen = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const userId = "UserID"; // Replace with actual user ID
            const response = await axios.get(`http://YOUR_BACKEND_IP:PORT/api/orders/user/${userId}`);
            setOrders(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <FlatList
                data={orders}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 20 }}>
                        <Text>Order #{item._id.slice(-5)}</Text>
                        {item.items.map((orderItem, index) => (
                            <Text key={index}>{orderItem.food.title} x {orderItem.quantity}</Text>
                        ))}
                        <Text>Total: ₹{item.totalAmount}</Text>
                        <Text>Status: {item.status}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default OrderScreen;
