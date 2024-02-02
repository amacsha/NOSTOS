import axios from "axios";
import React, { useEffect, useState } from "react";
import {Button, Text, Pressable, StyleSheet, View, Linking,} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectPlace, setPlaces } from "../../slices/placesSlice";
import { GooglePlaceResponse, Place } from "../../client-types/Place";
import AddPlacesService from "../../service/AddPlacesService";
import { fetchNewMissions } from "../../service/NewMissionService";
import * as Haptics from "expo-haptics";

const GOOGLE_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const Mission: React.FC = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const location = useSelector((state: RootState) => state.location);
  const places = useSelector((state: RootState) => state.places.places);
  const city = useSelector((state: RootState) => state.location.value?.cityName);
  const placeId = useSelector((state: RootState) => state.places.selectedPlaceId);

  const [selectedMarker, setSelectedMarker] = useState(false);
  const [selectedCoord, setSelectedCoord] = useState<number[]>([]);

  const lat = location.value?.lat;
  const lng = location.value?.lng;

  // useEffect(() => {
  //   axios
  //     .get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {
  //       params: {
  //         location: `${lat},${lng}`,
  //         radius: 10000,
  //         type: "hindu_temple",
  //         key: GOOGLE_KEY,
  //       },
  //     })
  //     .then((response) => {
  //       const places: Place[] = response.data.results.map(
  //         (place: GooglePlaceResponse) => ({
  //           id: place.place_id,
  //           lat: place.geometry.location.lat,
  //           lng: place.geometry.location.lng,
  //           name: place.name,
  //           city: "London", // TODO receive actual city upon location at login (get from state)
  //         })
  //       );
  //       AddPlacesService(places);
  //       dispatch(setPlaces(places));
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  useEffect(() => {
    city && fetchNewMissions(city, dispatch);
  }, [city]);

  function handleMarkerPress(place: Place, latitude: number, longitude: number) {
    axios
      .get(`https://maps.googleapis.com/maps/api/directions/json?destination=${latitude},${longitude}&origin=${lat},${lng}&key=${GOOGLE_KEY}`)
      .then((response) => response)
      .catch((error) => console.log(error));
    setSelectedCoord([latitude, longitude]);
    dispatch(selectPlace(place.id));
    setSelectedMarker(true);
  }
  
  return (
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
          latitude: location.value?.lat ?? 0,
          longitude: location.value?.lng ?? 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {places.map((place, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: place.lat, longitude: place.lng }}
            title={place.name}
            onPress={() => {
              handleMarkerPress(place, place.lat, place.lng)
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            }}
          />
        ))}
        {selectedMarker && (
          <View>
            <Pressable style={styles.missionButton} onPress={() => {
              navigation.navigate("Location")
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              )
              }}>
              <Text style={styles.missionText}>Go to mission</Text>
            </Pressable>

            <Pressable
              style={styles.directionsButton}
              onPress={() => Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${selectedCoord[0]},${selectedCoord[1]}&travelmode=walking`)}
            >
              <Text style={styles.directionsText}>Get directions</Text>
            </Pressable>
            
          </View>
        )}
      </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  directionsButton: {
    position: "absolute",
    top: 20,
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  missionButton: {
    position: "relative",
    bottom: 10,
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  directionsText: {
    fontSize: 30,
    color: "white",
    backgroundColor: "purple",
    padding: 5
  },
  missionText: {
    fontSize: 30,
    color: "white",
    backgroundColor: "purple",
    padding: 5
  }
});

export default Mission;
