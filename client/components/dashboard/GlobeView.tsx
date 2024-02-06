import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
import { useAppDispatch } from "../../hooks";
import { setLocation } from "../../slices/locationSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import axios from "axios";
import { GooglePlaceResponse, Place } from "../../client-types/Place";
import AddPlacesService from "../../service/AddPlacesService";

const GOOGLE_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const GlobeView: React.FC = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const location = useSelector((state: RootState) => state.location);

  const handlePress = (cityName: string) => {
    if (location.value?.lat && location.value.lng) {
      dispatch(
        setLocation({
          cityName,
          lng: location.value.lng,
          lat: location.value.lat,
        })
      );
      navigation.navigate("Navbar");
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <Image
        style={styles.globe}
        source={require("../../assets/spaceshipCloser.png")}
      />

      <Pressable
        style={[
          styles.LondonButton,
          location.value?.cityName === "London" && {
            backgroundColor: colors.lighterPurple,
          },
        ]}
        onPress={() => handlePress("London")}
      >
        <Text style={styles.locationButtonText}>London</Text>
      </Pressable>

      <Pressable
        style={[
          styles.BerlinButton,
          location.value?.cityName === "Berlin" && {
            backgroundColor: colors.lighterPurple,
          },
        ]}
        onPress={() => handlePress("Berlin")}
      >
        <Text style={styles.locationButtonText}>Berlin</Text>
      </Pressable>
    </SafeAreaProvider>
  );
};

export default GlobeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#010000",
  },
  globe: {
    height: 800,
    width: 420,
  },
  LondonButton: {
    position: "absolute",
    bottom: 140,
    left: 40,
    padding: 10,
    height: 44,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 8,
  },
  BerlinButton: {
    position: "absolute",
    bottom: 140,
    right: 40,
    padding: 10,
    height: 44,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 8,
  },
  locationButtonText: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Gruppe_A",
  },
});
