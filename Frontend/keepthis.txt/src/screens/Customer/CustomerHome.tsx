import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }: any) {
  const specials = [
    {
      id: "1",
      title: "Margherita Pizza",
      price: 199,
      type: "Veg",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP0HbRY0SsECXq3XHqjXUBw3CqK1VfE5PX1w&s",
    },
    {
      id: "2",
      title: "Cheese Burger",
      price: 149,
      type: "Non-Veg",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBFCimCM1wFvb3FZQOZH_j5ta4Qd2SlNj2vg&s",
    },
    {
      id: "3",
      title: "Pasta Alfredo",
      price: 229,
      type: "Veg",
      imageUrl:
        "https://www.allrecipes.com/thmb/LjXULjH7Yd_BeLLTLOlyaDx-xzE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/19402-Quick-And-Easy-Alfredo-Sauce-mfs_002-df1c96e0f9514d2191d0d8ce4c8a9745.jpg",
    },
  ];

  const cravings = [
    {
      id: "1",
      title: "Pizza",
      category: "pizza",
      imageUrl:
        "https://content.jdmagicbox.com/comp/def_content/pizza_outlets/default-pizza-outlets-13.jpg",
    },
    {
      id: "2",
      title: "Burger",
      category: "burger",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR2TXqK629ZC0aNqbDeKkH-RC77cQPeko7zQ&s",
    },
    {
      id: "3",
      title: "Pasta",
      category: "pasta",
      imageUrl:
        "https://www.sharmispassions.com/wp-content/uploads/2015/12/alfredopasta5.jpg",
    },
    {
      id: "4",
      title: "Salad",
      category: "salad",
      imageUrl:
        "https://cdn1.foodviva.com/static-content/food-images/salad-recipes/vegetable-salad-recipe/vegetable-salad-recipe.jpg",
    },
    {
      id: "5",
      title: "Sushi",
      category: "sushi",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sushi_platter.jpg/330px-Sushi_platter.jpg",
    },
    {
      id: "6",
      title: "Cake",
      category: "cake",
      imageUrl:
        "https://www.fnp.com/images/pr/m/v300/black-forest-cake-half-kg.jpg",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.hotelName}>Hotel Aroma</Text>
          <TouchableOpacity
            onPress={async () => {
              const userId = await AsyncStorage.getItem("userId");
              console.log("userId huu me", userId);
              navigation.navigate("ProfileScreen", { userId: userId });
            }}
          >
            <MCIcon name="account-circle" size={32} color="black" />
          </TouchableOpacity>
        </View>

        {/* Welcome Message */}
        <Text style={styles.welcomeText}>Welcome to ARomaMenu,</Text>

        {/* Banner / Display Box */}
        <View style={styles.bigBox}>
          <Image
            source={{
              uri: "https://img.freepik.com/free-psd/food-menu-restaurant-web-banner-template_106176-1452.jpg?semt=ais_hybrid&w=740",
            }}
            style={styles.bannerImage}
          />
        </View>

        {/* Craving Grid */}
        <Text style={styles.sectionTitle}>What you crave for?</Text>
        <View style={styles.grid}>
          {cravings.map((item) => (
            <View key={item.id} style={styles.cravingItem}>
              <TouchableOpacity
                style={styles.circle}
                onPress={() => navigation.navigate("GetFood", { category: item.category })}
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.circleImage}
                />
              </TouchableOpacity>
              <Text style={styles.cravingText}>{item.title}</Text>
            </View>
          ))}
        </View>

        {/* Our Specials */}
        <Text style={styles.sectionTitle}>Our Specials</Text>
        <FlatList
          data={specials}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
          renderItem={({ item }) => (
            <View style={styles.specialCard}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.dishImage}
              />
              <View style={styles.typeBox}>
                <Text
                  style={[
                    styles.typeText,
                    item.type === "Veg"
                      ? styles.vegText
                      : styles.nonVegText,
                  ]}
                >
                  {item.type}
                </Text>
              </View>
              <View style={styles.nameBox}>
                <Text style={styles.dishName}>{item.title}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceText}>₹{item.price}</Text>
              </View>
            </View>
          )}
        />

        <TouchableOpacity onPress={() => navigation.navigate("GetFood")}>
          <Text style={styles.seeAllText}>See all dishes</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate("CustomeHome")}
        >
          <MCIcon name="home" size={24} color="#ff6600" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate("Myorders")}
        >
          <MCIcon name="clipboard-list-outline" size={24} color="#888" />
          <Text style={styles.navText}>Orders</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate("AddToCart")}
        >
          <MCIcon name="cart" size={24} color="#888" />
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80, // Added padding to accommodate bottom nav
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
  },
  bigBox: {
    height: 150,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    gap: 5,
  },
  cravingItem: {
    alignItems: "center",
  },
  cravingText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
    color: "#444",
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "#ffd6a5",
    marginBottom: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  circleImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  specialCard: {
    width: 300,
    height: 280,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginRight: 16,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  dishImage: {
    height: 130,
    borderRadius: 14,
    marginBottom: 10,
    backgroundColor: "#fdf0e4",
    resizeMode: "cover",
  },
  nameBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ccc",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 8,
    marginTop: 8,
    backgroundColor: "#f9f9f9",
  },
  dishName: {
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
    color: "#333",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  typeBox: {
    alignSelf: "flex-start",
    backgroundColor: "#eee",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  typeText: {
    fontSize: 13,
    fontWeight: "600",
  },
  vegText: {
    color: "green",
  },
  nonVegText: {
    color: "red",
  },
  seeAllText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ff6600",
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  // Bottom Navigation Styles
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: "#888",
  },
});