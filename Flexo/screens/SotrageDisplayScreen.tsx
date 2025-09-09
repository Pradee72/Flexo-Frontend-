import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import axios from "axios";
import Colors from "../constant/Colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigation";

async function requestLocationPermission() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Flexo Location Permission",
          message: "Flexo needs access to your location to find nearby storage units.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    return true; // iOS handles this differently
  }
}

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "StorageMapScreen"
>;

export const StorageDisplayScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState("");
  const [units, setUnits] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);


  
  // Ask for location permission
  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      try {
        console.log("Hello");
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message:
              "This app needs access to your location to show nearby storage units.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return true//granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.log("error: " + err);
        return false;
      }
    } else {
      return true; // iOS handled via Info.plist
    }
  };

useEffect(() => {
  requestLocationPermission().then((granted) => {
    if (granted) {
      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // your API call here
        },
        (error) => {
          console.log("Location error:", error.message);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.log("Location permission not granted.");
    }
  });
}, []);

  // Filter units based on search input
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredUnits(units);
    } else {
      const searchLower = search.toLowerCase();
      const filtered = units.filter(
        (unit: any) =>
          unit.unitName.toLowerCase().includes(searchLower) ||
          unit.city.toLowerCase().includes(searchLower)
      );
      setFilteredUnits(filtered);
    }
  }, [search, units]);

  // Render each storage unit card
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={style.card}
      onPress={() => navigation.navigate("StorageMapScreen", { unit: item })}
    >
      <Text style={style.unitName}>{item.unitName}</Text>
      <Text style={style.address}>{item.address}</Text>
      <Text style={style.details}>
        {item.city} • {item.availableSlots}/{item.capacity} slots • ₹
        {item.pricePerKg}/kg
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={style.container}>
      <TextInput
        style={style.searchBar}
        placeholder="Search by city or unit name"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredUnits}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryWhite,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchBar: {
    height: 40,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  card: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  unitName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary,
  },
  address: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  details: {
    fontSize: 12,
    color: "#777",
  },
});
