import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, GestureResponderEvent, SafeAreaView } from 'react-native';
import GeoLocation from './GeoLocation';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';


import { SmallEntry } from '../../client-types/SmallEntry';
import EntriesView from './EntriesView';
import { cityFetcher } from './DashboardsServices';
import { ScrollView } from 'react-native-gesture-handler';

const Main: React.FC = ({navigation}: any) => {
  const fetchLocation = GeoLocation();
  const location = useSelector((state: RootState) => state.location);
  const [cityEntries, setCityEntries] = useState<(SmallEntry & {avg: number})[]>([])

  const asyncFetchLocation =  async() => {
    await fetchLocation()
  }

  useEffect(() => {asyncFetchLocation(); console.log('loc:', location.value?.cityName)}, [])
  
  useEffect(() => {
    location.value?.cityName != undefined && cityFetcher(location.value?.cityName, setCityEntries)
  }, [location]);


  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default Main;


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    alignItems: 'center',
    justifyContent: 'center',
  }
});
