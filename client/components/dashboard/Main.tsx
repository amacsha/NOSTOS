import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GeoLocation from './GeoLocation';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';


const Main: React.FC = () => {
  const fetchLocation = GeoLocation();
  const location = useSelector((state: RootState) => state.location);

  useEffect(() => {
    fetchLocation();
  }, []);


  return (
  
    <View style={styles.container}>
      {location ? (
        <Text style={styles.locationText}>Latitude: {location.value?.lat}, Longitude: {location.value?.lng}</Text>
      ) : (
        <Text style={styles.fetchingText}>Fetching location...</Text>
      )}
      <Text>Main Component</Text>
    </View>
  );
};

export default Main;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  fetchingText: {
    fontSize: 14,
    color: 'gray',
  },
});
