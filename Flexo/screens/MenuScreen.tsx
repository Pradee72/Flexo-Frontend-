import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

const menuItems = [
  { label: 'Help' },
  { label: 'Parcel - Send Items' },
  { label: 'Payment' },
  { label: 'My Rides' },
  { label: 'Safety' },
  { label: 'Refer and Earn', subtext: 'Get ₹50' },
  { label: 'My Rewards' },
  { label: 'Power Pass' },
  { label: 'Rapido Coins' },
];

const MenuScreen = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('userDetails');
        const parsedUser = userData ? JSON.parse(userData) : null;
        setUser(parsedUser);
        console.log('User:', parsedUser);
      } catch (err) {
        console.error('Error loading user from storage', err);
      }
    };

    loadUser(); // call the async function
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.menuHeader}>Menu</Text>

      {/* Profile Card */}
      <View style={styles.profileBox}>
        <View style={styles.row}>
          <Image source={{ uri: user?.photo }} style={styles.avatar} />

          <View>
            <Text style={styles.name}>{user?.name}</Text>

            <Text style={styles.phone}>{user?.email}</Text>
          </View>
        </View>

        <View style={styles.ratingRow}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.ratingText}>4.50 My Rating</Text>
        </View>
      </View>

      {/* Menu List */}
      <FlatList
        data={menuItems}
        keyExtractor={item => item.label}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem}>
            <View>
              <Text style={styles.menuText}>{item.label}</Text>
              {item.subtext && (
                <Text style={styles.subText}>{item.subtext}</Text>
              )}
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  menuHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  profileBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  phone: {
    fontSize: 14,
    color: '#666',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 16,
    color: '#f8b500',
    marginRight: 6,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  menuItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 15,
    fontWeight: '500',
  },
  subText: {
    fontSize: 12,
    color: '#888',
  },
  arrow: {
    fontSize: 22,
    color: '#ccc',
  },
});
