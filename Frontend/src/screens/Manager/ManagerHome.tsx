import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: "AuthLoading" as never }],
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F4F2" />
      <Text style={styles.title}>Welcome to the App</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("ManagerDashboard")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("DashBoard")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Dash</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Restaurants")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Restaurants</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("AddFoods")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add Food Items</Text>
      </TouchableOpacity>

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
                  onPress: handleLogout,
                },
              ]
            );
          }}
        />
      </View>
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
  logoutContainer: {
    marginTop: 20,
    width: "80%",
  },
});
