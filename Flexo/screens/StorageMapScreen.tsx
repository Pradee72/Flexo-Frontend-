import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

export const StorageMapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,      // Set your default latitude
          longitude: -122.4324,    // Set your default longitude
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,            // Ensures the map takes up the full screen
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
