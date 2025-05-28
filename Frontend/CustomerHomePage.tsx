// import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from "react-native";
// import Ionicons from 'react-native-vector-icons/Ionicons'; // Importing Ionicons from react-native-vector-icons
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Importing MaterialCommunityIcons

// const specials = [
//   { name: "Margherita Pizza", price: "₹199" },
//   { name: "Cheese Burger", price: "₹149" },
//   { name: "Pasta Alfredo", price: "₹179"  },
// ];

// export const CustomerHomePage = ({ userName = "Ravi", tableId = "T5" }) => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <Text style={styles.hotelName}>Aroma Hotel</Text>
//         <Text style={styles.specialTitle}>Our Specials</Text>

//         <FlatList
//           data={specials}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           keyExtractor={(item) => item.name}
//           contentContainerStyle={styles.specialsList}
//           renderItem={({ item }) => (
//             <View style={styles.specialCard}>
//               {/* <Image source={item.image} style={styles.dishImage} /> */}
//               <View style={styles.dishDetails}>
//                 <Text style={styles.dishName}>{item.name}</Text>
//                 <Text style={styles.price}>{item.price}</Text>
//               </View>
//               <TouchableOpacity style={styles.addButton}>
//                 <Ionicons name="add" size={20} color="white" />
//               </TouchableOpacity>
//             </View>
//           )}
//         />

//         {/* Add more sections here: Recommendations, Craving Grid, etc. */}
//       </ScrollView>

//       <View style={styles.bottomTab}>
//         <TouchableOpacity>
//           <Ionicons name="menu" size={24} color="#f97316" />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Ionicons name="cart" size={24} color="#f97316" />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <MaterialCommunityIcons name="tag" size={24} color="#f97316" />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   scrollContent: {
//     padding: 16,
//     paddingBottom: 100, // gives space above bottom tab
//   },
//   hotelName: {
//     fontSize: 20,
//     fontWeight: "600",
//     color: "#fb923c",
//     marginBottom: 10,
//   },
//   specialTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: 10,
//     color: "#1e293b",
//   },
//   specialsList: {
//     paddingBottom: 20,
//   },
//   specialCard: {
//     width: 180,
//     backgroundColor: "#fff7ed",
//     borderRadius: 16,
//     marginRight: 12,
//     padding: 12,
//     position: "relative",
//   },
//   dishImage: {
//     width: "100%",
//     height: 100,
//     borderRadius: 12,
//     marginBottom: 8,
//   },
//   dishDetails: {
//     marginBottom: 8,
//   },
//   dishName: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#1e293b",
//   },
//   price: {
//     fontSize: 14,
//     color: "#64748b",
//   },
//   addButton: {
//     position: "absolute",
//     bottom: 10,
//     right: 10,
//     backgroundColor: "#fb923c",
//     borderRadius: 20,
//     padding: 6,
//   },
//   bottomTab: {
//     position: "absolute",
//     bottom: 0,
//     height: 60,
//     width: "100%",
//     backgroundColor: "#fff",
//     borderTopWidth: 1,
//     borderColor: "#e2e8f0",
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//   },
// });
