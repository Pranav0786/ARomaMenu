import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
} from "react-native"
import { BASE_URL } from '@env'

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/Feather"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../types/navigation"

const { width } = Dimensions.get("window")

type Props = NativeStackScreenProps<RootStackParamList, "Login">

export const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [hidePassword, setHidePassword] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
    }
    if (!password) {
      newErrors.password = "Password is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async () => {
    console.log("Login button clicked")
    if (!validate()) return
    try {
      console.log("Login url=>" , `${BASE_URL}/auth/login`)
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      console.log("Response from backend:", data)
      const { token, user } = data.data;
      const { role, _id } = user;
      console.log("Token:", token);
      console.log("User:", user);
      console.log("role:", role);
      console.log("id:", _id);

      // Save token & role securely
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('role', role);
      await AsyncStorage.setItem('userId', _id);

      if (response.ok && data.success) {
        Alert.alert("Success", `You have logged in successfully! You will be navigated to the ${role} page.`)
        if (role === "customer") {
          navigation.replace("CustomeHome")
        } else if (role === "manager") {
          navigation.replace("DashBoard")
        }
      } else {
        setErrors({ general: data.message || "Login failed" })
      }
    } catch (error) {
      console.log("Network error:", error)
      setErrors({ general: "Network error. Please try again." })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fefefe" />
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      <View style={styles.inputContainer}>
        <Icon name="mail" size={20} color="#FF7F11" style={styles.icon} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
      </View>
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#FF7F11" style={styles.icon} />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={hidePassword}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => setHidePassword(!hidePassword)}
          style={styles.eyeIconContainer}>
          <Icon
            name={hidePassword ? "eye-off" : "eye"}
            size={20}
            color="#FF7F11"
          />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Don't have an account?{" "}
        <Text
          style={styles.signupText}
          onPress={() => navigation.navigate("Signup")}
        >
          Sign Up
        </Text>
      </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    color: "#333",
    fontWeight: "700",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 14,
    paddingHorizontal: 15,
    marginBottom: 10,
    elevation: 2,
    position: "relative",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#333",
    fontSize: 16,
  },
  eyeIconContainer: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  loginButton: {
    backgroundColor: "#FF7F11",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#FF7F11",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    marginTop: 10,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  footerText: {
    marginTop: 25,
    textAlign: "center",
    color: "#777",
    fontSize: 14,
  },
  signupText: {
    color: "#FF7F11",
    fontWeight: "600",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 5,
  },
})
