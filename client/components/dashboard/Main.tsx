import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, GestureResponderEvent, SafeAreaView } from 'react-native';
import GeoLocation from './GeoLocation';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';


import { SmallEntry } from '../../client-types/SmallEntry';
import EntriesView from './EntriesView';
import { cityFetcher } from './DashboardsServices';

const Main: React.FC = ({navigation}: any) => {
  const fetchLocation = GeoLocation();
  const location = useSelector((state: RootState) => state.location);
  const [cityEntries, setCityEntries] = useState<(SmallEntry & {avg: number})[]>([])

  const asyncFetchLocation =  async() => {
    await fetchLocation()
  }
  
  useEffect(() => {
    asyncFetchLocation();
    location.value != undefined && cityFetcher(location.value?.cityName, setCityEntries)
  }, [location]);


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>City: {location.value?.cityName}</Text>
        <Text>Active missions should go here</Text>
      </View>
      {location ? (
        <View style={{flex: 4}}>
          <EntriesView entries={cityEntries}></EntriesView>
        </View>
      ) : (
        <Text style={styles.fetchingText}>Sending position to the Mothership...</Text>
      )}
      <Button title='Go to mission' onPress={() => navigation.navigate('Mission')} />
    </SafeAreaView>
  );
};

export default Main;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    padding: 10,
    paddingTop: 40,
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
  bottom : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
