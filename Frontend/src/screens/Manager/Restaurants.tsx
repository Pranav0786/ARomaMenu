import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import { BASE_URL } from '@env';

interface Restaurant {
  _id?: string;
  title: string;
  imageurl: string;
  time: string;
  isOpen: boolean;
  rating: number;
  ratingCount?: string;
  code?: string;
  coords?: {
    id?: string;
    latitude: number;
    longitude: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
    address?: string;
    title?: string;
  };
  tables?: {
    tableNo: number;
    isVacant: boolean;
  }[];
}

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const getStaticMapUrl = (latitude: number, longitude: number) => {
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; 
    return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x300&markers=color:red%7C${latitude},${longitude}&key=${apiKey}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/restaurant/getallrestaurants`
        );
        setRestaurants(res.data.restaurants);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>ARomaMenu Restaurant</Text>
        {restaurants.map((restaurant, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: restaurant.imageurl }} style={styles.image} />
            <Text style={styles.title}>{restaurant.title}</Text>
            <Text style={styles.subText}>Rating: {restaurant.rating} ⭐</Text>
            <Text style={styles.subText}>Time: {restaurant.time}</Text>
            <Text style={styles.subText}>
              Status: {restaurant.isOpen ? '🟢 Open' : '🔴 Closed'}
            </Text>

            {restaurant.code && (
              <Text style={styles.subText}>Code: {restaurant.code}</Text>
            )}

            {restaurant.coords && (
              <View style={{ marginTop: 8 }}>
                <Text style={styles.coordTitle}>Location Info:</Text>
                {restaurant.coords.title && (
                  <Text style={styles.coordText}>📍 {restaurant.coords.title}</Text>
                )}
                {restaurant.coords.address && (
                  <Text style={styles.coordText}>🏠 {restaurant.coords.address}</Text>
                )}
                <Text style={styles.coordText}>
                  🌐 Lat: {restaurant.coords.latitude}, Lng: {restaurant.coords.longitude}
                </Text>

                {/* <Image
                  source={{
                    uri: getStaticMapUrl(
                      restaurant.coords.latitude,
                      restaurant.coords.longitude
                    ),
                  }}
                  style={styles.mapImage}
                /> */}
              </View>
            )}

            {restaurant.tables?.length ? (
              <>
                <Text style={styles.tablesTitle}>Tables:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.tableRow}>
                    {restaurant.tables.map((table, i) => (
                      <View key={i} style={styles.tableWrapper}>
                        <View
                          style={[
                            styles.tableBox,
                            {
                              backgroundColor: table.isVacant
                                ? '#22c55e'
                                : '#ef4444',
                            },
                          ]}
                        />
                        <Text style={styles.tableLabel}>T{table.tableNo}</Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </>
            ) : null}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#1e293b',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  mapImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginTop: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  subText: {
    fontSize: 14,
    color: '#4b5563',
    marginVertical: 2,
  },
  coordTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  coordText: {
    fontSize: 14,
    color: '#374151',
  },
  tablesTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  tableWrapper: {
    alignItems: 'center',
    marginRight: 14,
  },
  tableBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  tableLabel: {
    fontSize: 12,
    color: '#374151',
    marginTop: 4,
  },
});

export default RestaurantList;
