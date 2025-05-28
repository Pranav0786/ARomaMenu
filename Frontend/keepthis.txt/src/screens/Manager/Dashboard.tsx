import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '@env';
import { Alert } from 'react-native';


interface OrderItem {
    food: {
        _id: string;
        name: string;
        title: string;
        description: string;
        price: number;
        image: string;
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

export default function ManagerDashboard(): JSX.Element {
    const [orders, setOrders] = useState<Order[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await axios.get(`${BASE_URL}/order/getAllOrders`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOrders(res.data.data);
        } catch (error) {
            console.error('Failed to fetch orders', error);
        }
    };

    const renderOrder = ({ item }: { item: Order }) => (
        <View style={styles.tableCard}>
            <View style={styles.tableHeader}>
                <Text style={styles.tableTitle}>Order ID: {item._id.slice(-6)}</Text>
                <TouchableOpacity onPress={() => handleStatusUpdate(item._id, item.status)}>
                    <Text style={[styles.statusBadge, statusStyles[item.status]]}>
                        {item.status}
                    </Text>
                </TouchableOpacity>
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

    const getNextStatus = (currentStatus: Order['status']): Order['status'] => {
        switch (currentStatus) {
            case 'Pending':
                return 'Preparing';
            case 'Preparing':
                return 'Delivered';
            default:
                return currentStatus;
        }
    };
    const handleStatusUpdate = (orderId: string, currentStatus: Order['status']) => {
        const newStatus = getNextStatus(currentStatus);

        Alert.alert(
            'Update Order Status',
            `Are you sure you want to change the status to "${newStatus}"?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Status update cancelled'),
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem('token');
                            await axios.put(`${BASE_URL}/order/updateOrder/${orderId}`, {
                                status: newStatus,
                            }, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            });

                            // Update local state after success
                            setOrders(prevOrders =>
                                prevOrders.map(order =>
                                    order._id === orderId ? { ...order, status: newStatus } : order
                                )
                            );

                            Alert.alert('Success', `Order status updated to "${newStatus}".`);
                        } catch (error) {
                            console.error('Failed to update status:', error);
                            Alert.alert('Error', 'Failed to update order status.');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };


    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.topHeader}>
                <Text style={styles.header}>📦 Manager Dashboard</Text>
                <TouchableOpacity onPress={() => {
                    AsyncStorage.getItem('userId').then(userId => {
                        navigation.navigate('ProfileScreen', { userId });
                    });
                }}>
                    <MCIcon name="account-circle" size={30} color="#1f2937" />
                </TouchableOpacity>
            </View>

            <Text style={styles.subHeader}>Current Orders</Text>

            <FlatList
                data={orders}
                keyExtractor={item => item._id}
                renderItem={renderOrder}
                contentContainerStyle={{ paddingBottom: 50 }}
            />

            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.leftBtn}
                    onPress={() => navigation.navigate('Restaurants')}
                >
                    <Text style={styles.btnText}>Restaurant</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.rightBtn}
                    onPress={() => navigation.navigate('AddFoods')}
                >
                    <Text style={styles.btnText}>Add Food Items</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 50 },
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        zIndex: 100,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f97316',
    },
    subHeader: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 12,
        color: '#374151',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    leftBtn: {
        backgroundColor: '#3b82f6',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    rightBtn: {
        backgroundColor: '#10b981',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    btnText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
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
    }
});
