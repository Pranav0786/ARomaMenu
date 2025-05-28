import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Dimensions,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "@env";

export default function AllFoods({ route, navigation }: any) {
    const { category } = route.params || {};

    interface FoodItem {
        _id: string;
        imageurl: string;
        isVeg: boolean;
        title: string;
        price: number;
    }

    const [foods, setFoods] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const url = category
                ? `${BASE_URL}/food/getfoodbycategory/${category}`
                : `${BASE_URL}/food/getallfoods`;
                console.log("URL:", url);
                const response = await axios.get(url);
                console.log("Response:", response.data);
                setFoods(response.data.foods);
            } catch (error) {
                console.error("Error fetching foods:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFoods();
    }, [category]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.pageTitle}>
                {category ? `🍽 ${category}s You Crave` : "🍽 All Delicious Dishes"}
            </Text>

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#ff6600" />
                </View>
            ) : (
                <FlatList
                    data={foods}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("FoodScreen", { food: item })}
                            style={styles.card}
                        >
                            <Image source={{ uri: item.imageurl }} style={styles.image} />
                            <View style={styles.tag}>
                                <Text style={[styles.tagText, item.isVeg ? styles.veg : styles.nonVeg]}>
                                    {item.isVeg ? "Veg" : "Non-Veg"}
                                </Text>
                            </View>
                            <Text style={styles.title}>{item.title}</Text>
                            <View style={styles.footer}>
                                <Text style={styles.price}>₹{item.price}</Text>
                            </View>
                        </TouchableOpacity>
                    )}

                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listContent: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        marginBottom: 15,
        overflow: 'hidden',
        elevation: 3,
    },
    image: {
        height: Dimensions.get('window').width * 0.5,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
    },
    price: {
        fontSize: 16,
        color: '#ff6600',
        fontWeight: 'bold',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#333',
    },
    tagText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
    tag: {
        position: 'absolute',
        top: 10,
        left: 10,
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    veg: {
        backgroundColor: '#4CAF50',
    },
    nonVeg: {
        backgroundColor: '#FF5722',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    addBtn: {
        backgroundColor: '#ff6600',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addBtnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
