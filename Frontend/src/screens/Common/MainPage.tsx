import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const MainPage = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('AuthLoading');
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
      }}
      resizeMode="cover"
      style={styles.background}
      blurRadius={3}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.logoText}>🍽 ARomaMenu</Text>

          <Text style={styles.welcomeText}>Welcome to ARomaMenu</Text>
          <Text style={styles.subText}>
            Your personalized Augmented Reality menu experience.
          </Text>
          <Text style={styles.subText}>
            Explore dishes like never before, discover ingredients visually, and
            make better dining decisions.
          </Text>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginText}>Get Started →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 25,
  },
  container: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 25,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 10,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  subText: {
    fontSize: 16,
    color: '#eee',
    textAlign: 'center',
    marginBottom: 10,
    width: width * 0.9,
  },
  loginBtn: {
    marginTop: 40,
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 3,
  },
  loginText: {
    color: '#FF6F00',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default MainPage;