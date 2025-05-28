import React, { useEffect } from "react"
import { View, ActivityIndicator, StyleSheet } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../types/navigation"

type Props = NativeStackScreenProps<RootStackParamList, "MainPage"> // temporary

const AuthLoadingScreen = ({ navigation }: Props) => {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token")
        const role = await AsyncStorage.getItem("role")

        if (token && role) {
          if (role === "customer") {
            navigation.replace("CustomeHome")
          } else if (role === "manager") {
            navigation.replace("DashBoard")
          } else {
            navigation.replace("Login")
          }
        } else {
          navigation.replace("Login")
        }
      } catch (error) {
        console.error("Error checking auth:", error)
        navigation.replace("Login")
      }
    }

    checkAuth()
  }, [])

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF7F11" />
    </View>
  )
}

export default AuthLoadingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
})
