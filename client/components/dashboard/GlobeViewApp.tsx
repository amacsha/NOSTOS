import React, { useEffect, useState } from "react";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
import { useAppDispatch } from "../../hooks";
import { setLocation } from "../../slices/locationSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const GlobeViewApp: React.FC = ({ navigation }: any) => {
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
      navigation.navigate("Logs");
    }
  };

  return (
    // <SafeAreaView style={styles.container}>
    <>
      <ImageBackground
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
    </>
    // </SafeAreaView>
  );
};

export default GlobeViewApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#010000",
  },
  globe: {
    height: "100%",
    width: "100%"
  },
  LondonButton: {
    position: "absolute",
    bottom: 120,
    left: 20,
    padding: 10,
    height: 44,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 8,
  },
  BerlinButton: {
    position: "absolute",
    bottom: 120,
    right: 20,
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
