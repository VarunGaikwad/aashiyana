import React, { useEffect, useState, useCallback } from "react";
import { View, Platform, Alert, Image } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { styles } from "@/styles/default";

type UserLocationType = {
  latitude: number;
  longitude: number;
};

export default function MapScreen() {
  const [userLocation, setUserLocation] = useState<UserLocationType | null>(
    null
  );

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Location access is required.");
      return;
    }
    fetchUserLocation();
  }, []);

  const fetchUserLocation = useCallback(async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setUserLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to fetch location.");
    }
  }, []);

  const region: Region | undefined = userLocation
    ? {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : {
        latitude: 20.5937,
        longitude: 78.9629,
        latitudeDelta: 60,
        longitudeDelta: 60,
      };

  return (
    <View style={styles.mapContainer}>
      <MapView style={styles.map} region={region}>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        >
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/a/ACg8ocLZKrTIv59QYFycUltAgaNm4w3JAInPbQJN_DVn3pIGSOGu2MO1=s288-c-no",
            }}
            style={{
              width: 30,
              height: 30,
              borderRadius: 50,
            }}
            resizeMode="contain"
          />
        </Marker>
      </MapView>
    </View>
  );
}
