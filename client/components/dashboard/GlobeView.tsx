import React, { useEffect } from "react";
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

//   useEffect(() => {
//     axios
//       .get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {
//         params: {
//           location: `52.52002328525418, 13.404801819661525`,
//           radius: 10000,
//           type: "hindu_temple",
//           key: GOOGLE_KEY,
//         },
//       })
//       .then((response) => {
//         const places: Place[] = response.data.results.map(
//           (place: GooglePlaceResponse) => ({
//             id: place.place_id,
//             lat: place.geometry.location.lat,
//             lng: place.geometry.location.lng,
//             name: place.name,
//             city: "Berlin", // TODO receive actual city upon location at login (get from state)
//           })
//         );
//         AddPlacesService(places);
//       })
//       .catch((error) => console.log(error));
//   }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <Image
        style={styles.globe}
        source={require("../../assets/globe-view.png")}
      />

      <Pressable
        style={styles.locationButtonTopLeft}
        onPress={() => {
            location.value?.lat && location.value.lng && dispatch(
              setLocation({
                cityName: "London",
                lng: location.value.lng,
                lat: location.value.lat,
              })
            );
          navigation.navigate("Navbar");
        }}
      >
        <Text style={styles.locationButtonText}>London</Text>
      </Pressable>

      <Pressable
        style={styles.locationButtonBottomRight}
        onPress={() => {
          location.value?.lat && location.value.lng && dispatch(
              setLocation({
                cityName: "Berlin",
                lng: location.value.lng,
                lat: location.value.lat,
              })
            );
          navigation.navigate("Navbar");
        //   console.log("City Name:", location.value?.cityName)
        }}
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
  locationButtonTopLeft: {
    position: "absolute",
    top: 140,
    left: 40,
    padding: 10,
    height: 44,
    backgroundColor: colors.lighterPurple,
    borderRadius: 8,
  },
  locationButtonBottomRight: {
    position: "absolute",
    bottom: 140,
    right: 40,
    padding: 10,
    height: 44,
    backgroundColor: colors.lighterPurple,
    borderRadius: 8,
  },
  locationButtonText: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Gruppe_A",
  },
});
