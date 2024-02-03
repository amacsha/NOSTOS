import axios from "axios";
import React, { useEffect, useState } from "react";
import {Button, Text, Pressable, StyleSheet, View, Linking,} from "react-native";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectPlace, setPlaces } from "../../slices/placesSlice";
import { GooglePlaceResponse, Place } from "../../client-types/Place";
import AddPlacesService from "../../service/AddPlacesService";
import { fetchNewMissions } from "../../service/NewMissionService";
import * as Haptics from "expo-haptics";
import mapStyle from "./MapStyle";
import { GeofencingEventType } from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const GOOGLE_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

interface GeofencingData {
  eventType: GeofencingEventType;
  region: {
    identifier: string;
    latitude: number;
    longitude: number;
    radius: number;
    // Add any other properties you may need
  };
}

const Mission: React.FC = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const location = useSelector((state: RootState) => state.location);
  const places = useSelector((state: RootState) => state.places.places);
  const city = useSelector((state: RootState) => state.location.value?.cityName);

  const [selectedMarker, setSelectedMarker] = useState(false);
  const [selectedCoord, setSelectedCoord] = useState<number[]>([]);

  const lat = location.value?.lat;
  const lng = location.value?.lng;

  
  useEffect(() => {
    if (city){
      fetchNewMissions(city, dispatch);
    }
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
    
  TaskManager.defineTask('startGeofence', ({ data, error}: {data: GeofencingData; error?: any}) => {
    if (error) {
      console.log(error)
      return;
    }

    const { eventType, region} = data;

    if (eventType === GeofencingEventType.Enter) {
      console.log("You've entered region:", region);
    } else if (eventType === GeofencingEventType.Exit) {
      console.log("You've left region:", region);
    }
  });

  const placesToGeofence = () => {
    places.map(place => ({
      latitude: place.lat,
      longitude: place.lng,
      radius: 100
    }))
  }

  console.log(placesToGeofence)

  const startGeofence = async () => {
    await Location.startGeofencingAsync('startGeofence', placesToGeofence);
  }
  
  return (
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        customMapStyle={mapStyle}
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
            radius={100}
            fillColor="rgba(255, 0, 0, 0.3)"
          />
          <Marker
            coordinate={{ latitude: place.lat, longitude: place.lng }}
            icon={require('../../assets/mission-marker.png')}
            title={place.name}
            onPress={() => {
              handleMarkerPress(place, place.lat, place.lng);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          />
        </React.Fragment>
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
    fontFamily: 'Gruppe_A', 
  },
  directionsButton: {
    position: "absolute",
    top: 20,
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Gruppe_A', 
  },
  missionButton: {
    position: "relative",
    bottom: 10,
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Gruppe_A', 
  },
  directionsText: {
    fontSize: 30,
    color: 'white',
    backgroundColor: 'purple',
    fontFamily: 'Gruppe_A', 
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
