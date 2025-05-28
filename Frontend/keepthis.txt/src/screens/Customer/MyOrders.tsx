import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage'; 


interface OrderItem {
    food: {
        _id: string;
        name: string;
        title: string;
        description: string;
        price: number;
        image: string;
        imageurl?: string;
        ingredients?: string;
    };
    quantity: number;
}

interface Order {
    _id: string;
    user: {
        name: string;
        email: string;
        phone: string;
    };
    tableNumber: string;
    items: OrderItem[];
    totalAmount: number;
    status: 'Pending' | 'Preparing' | 'Delivered' | 'Cancelled';
    createdAt: string;
}

const statusStyles: Record<Order['status'], any> = {
    Pending: { backgroundColor: '#dc2626' },
    Preparing: { backgroundColor: '#f59e0b' },
    Delivered: { backgroundColor: '#16a34a' },
    Cancelled: { backgroundColor: '#6b7280' },
};

interface Props {
    onStatusPress?: (orderId: string, currentStatus: Order['status']) => void;
}

export default function MyOrders({ onStatusPress }: Props): JSX.Element {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch orders from the backend when the component mounts
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userid = await AsyncStorage.getItem('userId');
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get(`${BASE_URL}/order/getOrderByUserId/${userid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log("response =>", response.data);
                setOrders(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load orders. Please try again later.');
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const renderOrder = ({ item }: { item: Order }) => (
        <View style={styles.tableCard}>
            <View style={styles.tableHeader}>
                <Text style={styles.tableTitle}>Order ID: {item._id.slice(-6)}</Text>
                <Text
                    style={[styles.statusBadge, statusStyles[item.status]]}
                    onPress={() => onStatusPress?.(item._id, item.status)}
                >
                    {item.status}
                </Text>
            </View>

            <Text style={styles.metaText}>🕒 {new Date(item.createdAt).toLocaleString()}</Text>
            <Text style={styles.metaText}>👤 {item.user.name} | 📧 {item.user.email}</Text>
            <Text style={styles.metaText}>📞 {item.user.phone}</Text>
            <Text style={styles.metaText}>🪑 Table No: {item.tableNumber}</Text>

            <Text style={styles.orderLabel}>🧾 Items:</Text>
            {item.items.map(orderItem => (
                <View key={orderItem.food._id} style={styles.orderItem}>
                    <View style={styles.imageRow}>
                        {orderItem.food.imageurl && (
                            <Image
                                source={{ uri: orderItem.food.imageurl }}
                                style={styles.foodImage}
                                resizeMode="cover"
                            />
                        )}
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <View style={styles.orderRow}>
                                <Text style={styles.foodName}>
                                    {orderItem.food.title}
                                </Text>
                                <Text style={styles.metaText}>₹{orderItem.food.price}</Text>
                            </View>
                            <Text style={styles.metaText}>Qty: {orderItem.quantity}</Text>
                            <Text style={styles.metaText}>{orderItem.food.ingredients}</Text>
                        </View>
                    </View>
                </View>
            ))}

            <View style={styles.divider} />
            <Text style={styles.metaText}>💰 Total: ₹{item.totalAmount}</Text>
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#f97316" style={styles.loader} />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 20 }}>
            <Text style={styles.pageTitle}>My Orders</Text>
            <FlatList
                data={orders}
                keyExtractor={item => item._id}
                renderItem={renderOrder}
                contentContainerStyle={{ paddingBottom: 50 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    tableCard: {
        backgroundColor: '#fff7ed',
        padding: 16,
        borderRadius: 16,
        marginBottom: 20,
        borderColor: '#f97316',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 20,
        textAlign: 'center',
    },    
    tableTitle: { fontSize: 18, fontWeight: '700', color: '#f97316' },
    metaText: { color: '#6b7280', marginTop: 4, fontSize: 14 },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        overflow: 'hidden',
    },
    orderLabel: {
        marginTop: 12,
        fontWeight: '600',
        fontSize: 16,
        color: '#374151',
        marginBottom: 6,
    },
    orderItem: {
        marginTop: 8,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    orderRow: { flexDirection: 'row', justifyContent: 'space-between' },
    foodName: { fontSize: 15, fontWeight: '600', color: '#1f2937' },
    divider: {
        height: 1,
        backgroundColor: '#e5e7eb',
        marginTop: 12,
        marginBottom: 8,
    },
    imageRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    foodImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
        backgroundColor: '#e5e7eb',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    errorText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#dc2626',
        marginTop: 20,
    },
});
