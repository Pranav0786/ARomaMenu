import { useEffect, useState } from "react"
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
  ScrollView,
} from "react-native"
import Icon from "react-native-vector-icons/Feather"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../../types/navigation"
import { Select } from "../../components/ui/select"  
import { BASE_URL } from "@env"

const { width } = Dimensions.get("window")

type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Signup">

export const SignupScreen = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("") 
  const [hidePassword, setHidePassword] = useState(true)
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    setRole(""); 
  }, [])

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = "Name is required"
    if (!email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email"
    if (!phone.trim()) newErrors.phone = "Phone number is required"
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = "Enter a valid 10-digit number"
    if (!password) newErrors.password = "Password is required"
    else if (password.length < 6) newErrors.password = "Min 6 characters"
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    if (!role) newErrors.role = "Role is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = async () => {
    if (!validate()) return
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password, role }),
      })
      const data = await response.json()
      if (response.ok && data.success) {
        Alert.alert("Success", "Registered successfully!")
        navigation.replace("Home")
      } else {
        setErrors({ general: data.message || "Registration failed" })
      }
    } catch (error) {
      console.log("Network error:", error)
      setErrors({ general: "Network error. Please try again." })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fefefe" />
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
        <Text style={styles.title}>Join ARomaMenu!</Text>
        <Text style={styles.subtitle}>Signup to continue</Text>

        <InputField icon="user" placeholder="Name" value={name} onChangeText={setName} error={errors.name} />
        <InputField icon="mail" placeholder="Email" value={email} onChangeText={setEmail} error={errors.email} />
        <InputField icon="phone" placeholder="Phone No" value={phone} onChangeText={setPhone} keyboardType="phone-pad" error={errors.phone} />
        <PasswordField
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          hide={hidePassword}
          toggleHide={() => setHidePassword(!hidePassword)}
          error={errors.password}
        />
        <PasswordField
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          hide={hideConfirmPassword}
          toggleHide={() => setHideConfirmPassword(!hideConfirmPassword)}
          error={errors.confirmPassword}
        />

        <View style={styles.pickerWrapper}>
          <Select
            options={[
              { label: "Select Role", value: "" }, 
              { label: "Customer", value: "customer" },
              { label: "Manager", value: "manager" },
            ]}
            value={role}
            onValueChange={setRole}
          />
        </View>

        {errors.role && <Text style={styles.errorText}>{errors.role}</Text>}

        {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text style={styles.signupText} onPress={() => navigation.navigate("Login")}>
            Login
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const InputField = ({ icon, placeholder, value, onChangeText, error, keyboardType = "default" }: any) => (
  <>
    <View style={styles.inputContainer}>
      <Icon name={icon} size={20} color="#FF7F11" style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        keyboardType={keyboardType}
      />
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </>
)

const PasswordField = ({ placeholder, value, onChangeText, hide, toggleHide, error }: any) => (
  <>
    <View style={styles.inputContainer}>
      <Icon name="lock" size={20} color="#FF7F11" style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={hide}
        style={styles.input}
      />
      <TouchableOpacity onPress={toggleHide} style={styles.eyeIconContainer}>
        <Icon name={hide ? "eye-off" : "eye"} size={20} color="#FF7F11" />
      </TouchableOpacity>
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    color: "#333",
    fontWeight: "700",
    marginBottom: 5,
    textAlign: "left",
  },
  subtitle: {
    fontSize: 16,
    paddingEnd: 10,
    color: "#666",
    marginBottom: 30,
    textAlign: "left",
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
  label: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 14,
    color: "#444",
    fontWeight: "500",
  },
  pickerWrapper: {
    backgroundColor: "#f5f5f5",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom:0,
    marginBottom: 10,
    elevation: 2,
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
    fontWeight: "500",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 5,
  },
})

