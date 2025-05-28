import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { BASE_URL } from '@env';


export default function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageurl, setImageurl] = useState('');
  const [ARmodelUrl, setARmodelUrl] = useState('');
  const [category, setcategory] = useState('');
  const [isVeg, setIsVeg] = useState(true);
  const [price, setPrice] = useState('');
  const [spiceLevel, setSpiceLevel] = useState('Medium');
  const [speciality, setSpeciality] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [rating, setRating] = useState(1);


  const handleFormSubmit = async () => {
    const foodData = {
      title,
      description,
      imageurl,
      ARmodelUrl,
      category,
      isVeg,
      isAvailable: true,
      price: Number(price),
      rating,
      reviews: 1,
      spiceLevel,
      speciality,
      ingredients,
    };
  
    try {
      const response = await fetch(`${BASE_URL}/food/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Success:', result);
      Alert.alert('Success', 'Food item added successfully!');
      
      // Optionally reset the form
      setTitle('');
      setDescription('');
      setImageurl('');
      setARmodelUrl('');
      setcategory('');
      setIsVeg(true);
      setPrice('');
      setRating(1);
      setSpiceLevel('Medium');
      setSpeciality('');
      setIngredients('');
  
    } catch (error) {
      console.error('Error submitting food item:', error);
      Alert.alert('Error', 'Failed to add food item. Please try again.');
    }
  };
  


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🍽️ Add Food Item</Text>


      <View style={styles.card}>
        <Input label="Title" value={title} onChangeText={setTitle} icon="food" />
        <Input label="Description" value={description} onChangeText={setDescription} icon="file-document-edit" multiline />
        <Input label="Image URL" value={imageurl} onChangeText={setImageurl} icon="image" />
        <Input label="AR Model URL" value={ARmodelUrl} onChangeText={setARmodelUrl} icon="cube-outline" />


        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={category}
            onValueChange={(value) => setcategory(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Category" value="" />
            <Picker.Item label="Burger" value="burger" />
            <Picker.Item label="Pizza" value="pizza" />
            <Picker.Item label="Cake" value="cake" />
            <Picker.Item label="Drinks" value="drinks" />
          </Picker>
        </View>


        <Input label="Price (₹)" value={price} onChangeText={setPrice} icon="currency-inr" keyboardType="numeric" />
        <Input label="Speciality" value={speciality} onChangeText={setSpeciality} icon="star" />
        <Input label="Ingredients" value={ingredients} onChangeText={setIngredients} icon="format-list-bulleted" />


        <Text style={styles.label}>Spice Level</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={spiceLevel}
            onValueChange={(value) => setSpiceLevel(value)}
            style={styles.picker}
          >
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="Spicy" value="Spicy" />
            <Picker.Item label="More Spicy" value="More Spicy" />
          </Picker>
        </View>


        <View style={styles.toggleContainer}>
          <Text style={styles.toggleText}>Is Veg?</Text>
          <TouchableOpacity style={styles.toggleButton} onPress={() => setIsVeg(!isVeg)}>
            <Icon name={isVeg ? 'leaf' : 'fire'} size={24} color={isVeg ? '#4caf50' : '#f44336'} />
          </TouchableOpacity>
        </View>


        <Text style={styles.label}>Rating</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((val) => (
            <TouchableOpacity key={val} onPress={() => setRating(val)}>
              <Icon
                name={val <= rating ? 'star' : 'star-outline'}
                size={30}
                color="#ffb300"
              />
            </TouchableOpacity>
          ))}
        </View>


        <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


const Input = ({ label, icon, ...props }:any) => (
  <View style={styles.inputWrapper}>
    <Icon name={icon} size={20} color="#ff6600" style={styles.icon} />
    <TextInput
      placeholder={label}
      placeholderTextColor="#999"
      style={styles.input}
      {...props}
    />
  </View>
);


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff8f2',
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#ff6600',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ffb380',
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fffdfc',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  pickerWrapper: {
    borderColor: '#ffb380',
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: 8,
    overflow: 'hidden',
    backgroundColor: '#fffdfc',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    marginLeft: 5,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  toggleText: {
    fontSize: 16,
    color: '#555',
    marginRight: 10,
  },
  toggleButton: {
    padding: 10,
    backgroundColor: '#fffdfc',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffb380',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  submitButton: {
    backgroundColor: '#ff6600',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
