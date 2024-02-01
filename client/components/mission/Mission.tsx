import React from "react";
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MapView, { Marker } from 'react-native-maps'; 
import { RootState } from '../../store';
import { Button, Text, View } from "react-native";
import { setPlaces } from "../../slices/placesSlice";
import { Place } from "../../client-types/Place";

const GOOGLEKEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;


const Mission: React.FC = ({ navigation }: any) => {
  const location = useSelector((state: RootState) => state.location);
  const placesObject = useSelector((state: RootState) => state.places.places);
  const placesArray: Place[] = Object.values(placesObject);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
      params: {
        location: `${location.value?.lat},${location.value?.lng}`,
        radius: 1000,
        type: 'bar',
        key: "AIzaSyCmeVnnM6RM-Z9lkxr3f8mbu6PcO-19hgA",
      }
    })
    .then(response => {
      const places = response.data.results.map(place => ({
        id: place.place_id,
        geometry: place.geometry, 
        lat: place.geometry.location.lat, 
        lng: place.geometry.location.lng,
        name: place.name, 
      }));
      console.log('this is: ', places);
      dispatch(setPlaces(places));
    })
    .catch(error => console.log(error));
  }, [dispatch, location.value!.lat, location.value!.lng]);

  return (
    <View style={{ flex: 1 }}>
      <MapView 
        provider="google"
        style={{ flex: 1 }}
        mapId="5b72ee2407636260"
        initialRegion={{
          latitude: location.value?.lat ?? 0,
          longitude: location.value?.lng ?? 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {placesArray.map((place, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: place.lat, longitude: place.lng }}
            title={place.name}
          />
        ))}
      </MapView>
      <Button title="Go to location" onPress={() => navigation.navigate("Location")} />
    </View>
  );
};

export default Mission;