import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  Pressable,
  StyleSheet,
  View,
  Linking,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectPlace, setPlaceName, setPlaces } from "../../slices/placesSlice";
import { GooglePlaceResponse, Place } from "../../client-types/Place";
import AddPlacesService from "../../service/AddPlacesService";
import { fetchNewMissions } from "../../service/NewMissionService";
import * as Haptics from "expo-haptics";
import mapStyle from "./MapStyle";
import { GeofencingEventType } from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
import { isPointWithinRadius } from "geolib";
import { setLastVisited } from "../../service/MissionServices";

const GOOGLE_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

interface GeofencingData {
  eventType: GeofencingEventType;
  region: {
    identifier: string;
    latitude: number;
    longitude: number;
    radius: number;
  };
}

const Mission: React.FC = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const location = useSelector((state: RootState) => state.location);
  const places = useSelector((state: RootState) => state.places.places);
  const city = useSelector(
    (state: RootState) => state.location.value?.cityName
  );
  const placeId = useSelector(
    (state: RootState) => state.places.selectedPlaceId
  );
  const userId = useSelector((state: RootState) => state.user.id);
  const radius = 100;

  const [selectedCoord, setSelectedCoord] = useState<number[]>([]);

  const lat = location.value?.lat;
  const lng = location.value?.lng;

  useEffect(() => {
    if (city) {
      fetchNewMissions(city, dispatch);
    }
  }, [city]);

  function handleMarkerPress(place: Place, latitude: number, longitude: number) {
    axios.get(`https://maps.googleapis.com/maps/api/directions/json?destination=${latitude},${longitude}&origin=${lat},${lng}&key=${GOOGLE_KEY}`)
      .then((response) => response)
      .catch((error) => console.log(error));
    setSelectedCoord([latitude, longitude]);
    dispatch(selectPlace(place.id));
    dispatch(setPlaceName(place.name));
  }

  const verifyLocation = () => {
    return (
      lat &&
      lng &&
      isPointWithinRadius(
        { latitude: lat, longitude: lng },
        { latitude: selectedCoord[0], longitude: selectedCoord[1] },
        radius
      )
    );
  };

  const [zoomLevel, setZoomLevel] = useState(0);

  const handleRegionChange = (region: any) => {
    setZoomLevel(region.longitudeDelta);
  };

  return (
    // <SafeAreaProvider>
    <>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        customMapStyle={mapStyle}
        toolbarEnabled={false}
        showsMyLocationButton={true}
        showsCompass={false}
        loadingEnabled={true}
        onRegionChange={handleRegionChange}
        onPress={() => dispatch(selectPlace(null))}
        initialRegion={{
          latitude: location.value?.lat ?? 0,
          longitude: location.value?.lng ?? 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {places.map((place, index) => (
          <React.Fragment key={index}>
            <Circle
              center={{ latitude: place.lat, longitude: place.lng }}
              radius={200}
              fillColor="rgba(127, 17, 224, 0.3)"
              strokeColor="rgba(255, 255, 255, 0.6)"
              strokeWidth={2}
            />
            <Marker
              coordinate={{ latitude: place.lat, longitude: place.lng }}
              // title={place.name}
              anchor={{ x: 0.5, y: 0.5 }}
              style={{
                transform: [{ scale: 1 + zoomLevel }],
              }}
              onPress={(event) => {
                event.stopPropagation();
                handleMarkerPress(place, place.lat, place.lng);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              <Image
                source={require("../../assets/mission-marker.png")}
                style={{ width: 40, height: 40 }}
              />
              <Callout style={styles.calloutContainer}>
                <Text style={styles.calloutText}>
                  {place.name}
                </Text>
              </Callout>
            </Marker>
          </React.Fragment>
        ))}
      </MapView>
      {placeId !== null && (
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              if (verifyLocation()) {
                navigation.navigate("Location");
                userId && setLastVisited(userId, placeId);
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success
                );
              } else {
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Error
                );
                Alert.alert("Not inside location radius");
              }
            }}
          >
            <Text style={styles.text}>Confirm location</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${selectedCoord[0]},${selectedCoord[1]}&travelmode=walking`
              )
            }
          >
            <Text style={styles.text}>Get directions</Text>
          </Pressable>
        </View>
      )}
      </>
    // </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 15,
    fontFamily: "Gruppe_A",
  },
  buttonContainer: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: colors.darkGrey,
  },
  button: {
    position: "relative",
    marginHorizontal: 15,
    flexDirection: "row",
    maxWidth: 500,
    height: 50,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Gruppe_A",
    verticalAlign: "middle"
  },
  text: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    backgroundColor: colors.basePurple,
    fontFamily: "Gruppe_A",
    padding: 5,
  },
  calloutContainer: {
    minWidth: 100,
  },
  calloutText: {
    fontFamily: "Gruppe_A",
    textAlign: "auto"
  }
});

export default Mission;
