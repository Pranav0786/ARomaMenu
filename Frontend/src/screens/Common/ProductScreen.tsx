import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Pressable,
	Modal,
	Alert,
} from "react-native";
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

const mockProduct = {
	id: 1,
	name: "Classic Cheeseburger",
	imageUrl:
		"https://images.slurrp.com/prod/recipe_images/transcribe/snack/Vegetable-Burger.webp",
	model3DUrl: "https://fihtpzjtefcqzjdyvbxi.supabase.co/storage/v1/object/public/products/burgar_04.glb",
	currentPrice: 150,
	previousPrice: 199,
	amountInStock: 15,
	rating: 4.2,
	reviews: 132,
	isVegetarian: true,
};

export default function ProductScreen() {
	const [selectOpen, setSelectOpen] = useState(false);
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	const onViewAR = () => {
		navigation.navigate('AR');
	};

	const offPercentage = Math.round(
		((mockProduct.previousPrice - mockProduct.currentPrice) /
			mockProduct.previousPrice) *
		100
	);

	return (
		<>
			<ScrollView style={styles.container}>
				<Text style={styles.productName}>{mockProduct.name}</Text>

				<Image
					source={{ uri: mockProduct.imageUrl }}
					style={styles.productImage}
					resizeMode="cover"
				/>

				<View style={styles.tagRow}>
					{mockProduct.isVegetarian && (
						<Text style={styles.vegTag}>🟢 Vegetarian</Text>
					)}
					<Text style={styles.ratingText}>⭐ {mockProduct.rating} ({mockProduct.reviews} reviews)</Text>
				</View>

				<View style={styles.viewButtonWrapper}>
					<TouchableOpacity style={styles.viewButton} onPress={onViewAR}>
						<MCIcon
							name="camera-outline"
							size={20}
							color="#0e4db3"
							style={{ marginRight: 5 }}
						/>
						<Text style={styles.viewButtonText}>VIEW IN YOUR ROOM</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.priceRow}>
					<Text style={styles.discountText}>-{offPercentage}%</Text>
					<Text style={styles.priceText}>
						<Text style={styles.dollar}>₹</Text>
						{mockProduct.currentPrice}
					</Text>
				</View>

				<Text style={styles.previousPrice}>MRP: ₹{mockProduct.previousPrice}</Text>

				<Text style={styles.description}>
					A rich, creamy North Indian delicacy made with paneer cubes cooked in a buttery tomato-based gravy. Served hot with naan or rice! 🍛
				</Text>

				<Text style={styles.subHeading}>🌶 Spice Level:</Text>
				<Text style={styles.infoText}>Medium</Text>

				<Text style={styles.subHeading}>👨‍🍳 Speciality:</Text>
				<Text style={styles.infoText}>
					Authentic Mughlai-style preparation with fresh cream and aromatic spices.
				</Text>

				<Text style={styles.subHeading}>🧾 Ingredients:</Text>
				<Text style={styles.infoText}>
					Paneer, Tomato Puree, Butter, Fresh Cream, Cashews, Garam Masala, Kasuri Methi.
				</Text>

				{/* 🛒 Add to Cart Button */}
				<TouchableOpacity
				style={styles.addToCartButton}
				onPress={() => {
					Alert.alert("Added to cart!", "Redirecting to payment...", [
					{
						text: "OK",
						onPress: () => navigation.navigate('AddToCart'),
					},
					]);
				}}
				>
				<Text style={styles.addToCartButtonText}>ADD TO CART</Text>
				</TouchableOpacity>
			</ScrollView>

			<Modal
				visible={selectOpen}
				transparent
				animationType="fade"
				onRequestClose={() => setSelectOpen(false)}
			>
				<Pressable
					style={styles.modalOverlay}
					onPress={() => setSelectOpen(false)}
				/>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 25,
		backgroundColor: "#fff",
		padding: 20,
	},
	productName: {
		color: "#333",
		fontSize: 26,
		fontWeight: "bold",
		marginBottom: 10,
	},
	productImage: {
		height: 250,
		width: "100%",
		borderRadius: 10,
	},
	tagRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
	},
	vegTag: {
		color: "green",
		fontWeight: "bold",
	},
	ratingText: {
		color: "#f39c12",
		fontWeight: "600",
	},
	viewButtonWrapper: {
		alignItems: "center",
		marginVertical: 20,
	},
	viewButton: {
		borderWidth: 1,
		borderRadius: 50,
		borderColor: "#0e4db3",
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	viewButtonText: {
		color: "#0e4db3",
		fontSize: 14,
		fontWeight: "bold",
	},
	priceRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		marginTop: 10,
	},
	discountText: {
		fontSize: 28,
		color: "#e53935",
	},
	priceText: {
		fontSize: 28,
		fontWeight: "bold",
	},
	dollar: {
		fontSize: 20,
	},
	previousPrice: {
		color: "gray",
		textDecorationLine: "line-through",
		fontSize: 14,
		marginBottom: 10,
	},
	description: {
		fontSize: 15,
		color: "#555",
		marginVertical: 10,
	},
	subHeading: {
		fontWeight: "bold",
		fontSize: 16,
		marginTop: 10,
	},
	infoText: {
		fontSize: 14,
		color: "#555",
	},
	addToCartButton: {
		backgroundColor: '#ff7f11',
		paddingVertical: 15,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 20,
		marginBottom: 40,
	},
	addToCartButtonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
	modalOverlay: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "rgba(0,0,0,0.4)",
	},
	modalContent: {
		position: "absolute",
		top: "30%",
		left: "20%",
		right: "20%",
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 20,
		elevation: 5,
	},
	quantityOption: {
		padding: 10,
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 5,
	},
});