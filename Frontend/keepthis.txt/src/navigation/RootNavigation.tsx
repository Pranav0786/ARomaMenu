import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

// Auth Screens
import {LoginScreen} from "../screens/Auth/LoginScreen";
import {SignupScreen} from "../screens/Auth/SignupScreen";
import AuthLoadingScreen from "../screens/Auth/AuthLoadingScreen";    

// Common Screens
import HomeScreen from "../screens/Common/HomeScreen";
import MainPage from "../screens/Common/MainPage";
import ProductScreen from "../screens/Common/ProductScreen";
import ProfileScreen from "../screens/Customer/ProfileScreen";

// AR Screens
import ARScreen from "../screens/AR/ARScreen";
import HelloWorldSceneAR from "../screens/AR/HelloWorldSceneAR";

// Customer Screens
import CustomeHome from "../screens/Customer/CustomerHome";
import AddToCartScreen from "../screens/Customer/AddToCart";
import PaymentScreen from "../screens/Customer/PaymentScreen";
import GetFood from "../screens/Customer/GetFood";
import FoodScreen from "../screens/Customer/FoodScreen";
import MakeOrder from "../screens/Customer/MakeOrder";
import MyOrders from "../screens/Customer/MyOrders";

// Manager Screens
import ManagerHome from "../screens/Manager/ManagerHome";
import ManagerDashboard from "../screens/Manager/ManagerDashboard";
import Restaurants from "../screens/Manager/Restaurants";
import AddFoods from "../screens/Manager/AddFoods";
import Dashboard from "../screens/Manager/Dashboard";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage" screenOptions={{ headerShown: false }}>

        {/* MainPage Welcomming Routes */}
        <Stack.Screen name="MainPage" component={MainPage} />

        {/* Common Routes */}
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />

        {/* Auth Routes */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />

        {/* Customer Routes */}
        <Stack.Screen name="CustomeHome" component={CustomeHome} />
        <Stack.Screen name="GetFood" component={GetFood} />
        <Stack.Screen name="FoodScreen" component={FoodScreen} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="AddToCart" component={AddToCartScreen} />
        <Stack.Screen name="MakeOrder" component={MakeOrder} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Myorders" component={MyOrders} />

        {/* Common Routes */}

        {/* Manager Routes */}
        <Stack.Screen name="ManagerHome" component={ManagerHome} />
        <Stack.Screen name="ManagerDashboard" component={ManagerDashboard} />
        <Stack.Screen name="AddFoods" component={AddFoods} />
        <Stack.Screen name="Restaurants" component={Restaurants} />
        <Stack.Screen name="DashBoard" component={Dashboard} />

        {/* Temp Routes */}

        {/* AR Routes */}
        <Stack.Screen name="AR" component={ARScreen} />
        <Stack.Screen name="WorldAR" component={HelloWorldSceneAR} />

        {/* Temp Routes */}
        <Stack.Screen name="Home" component={HomeScreen} />
        


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
