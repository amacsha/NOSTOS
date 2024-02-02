import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';
import {setLocation} from '../../slices/locationSlice';

const useCurrentLocation = () => {
  const dispatch = useDispatch();

  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let fullAddress = await Location.reverseGeocodeAsync({latitude: location.coords.latitude, longitude: location.coords.longitude});
    dispatch(setLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
      cityName: fullAddress[0].city || '',
    }));
  };

  return fetchLocation;
};

export default useCurrentLocation;