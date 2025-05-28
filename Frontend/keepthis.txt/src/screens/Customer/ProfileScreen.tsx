import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Image,
    ScrollView,
    RefreshControl,
} from "react-native";
import { Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import { BASE_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';



interface RouteParams {
    userId: string;
}

export default function ProfileScreen({ route }: { route: { params: RouteParams } }) {
    const { userId } = route.params;
    const navigation = useNavigation();
    const [user, setUser] = useState<null | {
        name: string;
        email: string;
        role: string;
        phone: string;
        profile: string;
        createdAt: string;
        updatedAt: string;
    }>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchUser = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            console.log("token qqqqqqqqqqqq", token);
            console.log("URL=>", `${BASE_URL}/user/getuserid/${userId}`);
            const res = await fetch(`${BASE_URL}/user/getuserid/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 401) {
                // Token is expired or invalid
                console.log("Token expired or unauthorized. Logging out...");
                await AsyncStorage.clear();
                navigation.reset({
                    index: 0,
                    routes: [{ name: "AuthLoading" as never }],
                });
                return;
            }

            const json = await res.json();
            console.log("JSON => ", json);
            if (json.success) setUser(json.data);
        } catch (err) {
            console.error("Fetch error: ", err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };


    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#ff6600" />
            </View>
        );
    }

    if (!user) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Could not load user.</Text>
            </View>
        );
    }

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchUser(); }} />}
        >
            <View style={styles.avatarContainer}>
                <Image source={{ uri: user.profile }} style={styles.avatar} />
            </View>

            <View style={styles.infoBox}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.value}>{user.name}</Text>
            </View>

            <View style={styles.infoBox}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{user.email}</Text>
            </View>

            <View style={styles.infoBox}>
                <Text style={styles.label}>Phone</Text>
                <Text style={styles.value}>{user.phone}</Text>
            </View>

            <View style={styles.infoBox}>
                <Text style={styles.label}>Joined</Text>
                <Text style={styles.value}>{new Date(user.createdAt).toDateString()}</Text>
            </View>

            <View style={styles.logoutContainer}>
                <Button
                    title="Logout"
                    color="#ff7f11"
                    onPress={() => {
                        Alert.alert(
                            "Confirm Logout",
                            "Are you sure you want to log out?",
                            [
                                { text: "Cancel", style: "cancel" },
                                {
                                    text: "Yes, logout",
                                    style: "destructive",
                                    onPress: async () => {
                                        await AsyncStorage.clear();
                                        navigation.reset({
                                            index: 0,
                                            routes: [{ name: "AuthLoading" as never }],
                                        });
                                    },
                                },
                            ]
                        );
                    }}
                />
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    avatarContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 4,
        borderColor: "#ff6600",
    },
    infoBox: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: "#fff5f0",
        borderRadius: 12,
        borderLeftWidth: 6,
        borderLeftColor: "#ff6600",
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#444",
    },
    value: {
        fontSize: 18,
        fontWeight: "700",
        color: "#222",
        marginTop: 4,
    },
    logoutContainer: {
        marginTop: 30,
        alignItems: "center",
    },
    errorText: {
        color: "red",
        fontSize: 16,
    },
});
