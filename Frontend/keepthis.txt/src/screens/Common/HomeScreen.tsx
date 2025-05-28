import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F4F2" />
      <Text style={styles.title}>Welcome to the App</Text>

      <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")} style={styles.button}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("AR")} style={styles.button}>
        <Text style={styles.buttonText}>AR Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("WorldAR")} style={styles.button}>
        <Text style={styles.buttonText}>Hello World AR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Restaurants")} style={styles.button}>
        <Text style={styles.buttonText}>Restaurants</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => navigation.navigate("AddFoods")} style={styles.button}>
        <Text style={styles.buttonText}>Add Foods</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.button}>
        <Text style={styles.buttonText}>Home Page</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("MainPage")} style={styles.button}>
        <Text style={styles.buttonText}>Main Page</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ProductScreen")} style={styles.button}>
        <Text style={styles.buttonText}>Product Screen</Text>
      </TouchableOpacity>

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F4F2",
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 30,
    
  },
  button: {
    backgroundColor: "#FF7F50",
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
