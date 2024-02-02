import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, GestureResponderEvent, SafeAreaView } from 'react-native';
import GeoLocation from './GeoLocation';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';


import { SmallEntry } from '../../client-types/SmallEntry';
import EntriesView from './EntriesView';
import { cityFetcher, getActiveMissions } from './DashboardsServices';
import { Place } from '../../client-types/Place';
import MissionView from './MissionView';
import LogoutService from '../logout/Logout';

const Main: React.FC = ({navigation}: any) => {
  const fetchLocation = GeoLocation();
  const location = useSelector((state: RootState) => state.location);
  const userId =  useSelector((state: RootState) => state.user.id);
  const [cityEntries, setCityEntries] = useState<(SmallEntry & {avg: number})[]>([])
  const [activeMissions, setActiveMissions] = useState<Place[]>([])

  const asyncFetchLocation =  async() => {
    await fetchLocation()
  }

  useEffect(() => {asyncFetchLocation()}, [])
  
  useEffect(() => {
    location.value?.cityName != undefined && cityFetcher(location.value?.cityName, setCityEntries)
  }, [location]);

  useEffect(() => {
    userId && getActiveMissions(userId, setActiveMissions)
  }, [userId])


  return (
    <SafeAreaView style={styles.container}>
      <LogoutService></LogoutService>
      <View>
        <LogoutService></LogoutService>
      <Button title='Go to mission' onPress={() => navigation.navigate('Mission')} />
        <Text>City: {location.value?.cityName}</Text>
        {activeMissions.length == 0 ?
          <Text>No active missions available</Text>:
          <MissionView places={activeMissions}></MissionView>
        }
      </View>
      {location ? (
        <View style={{flex: 7, borderColor: 'green',
        borderWidth: 2,}}>
          <EntriesView entries={cityEntries}></EntriesView>
        </View>
      ) : (
        <Text style={styles.fetchingText}>Sending position to the Mothership...</Text>
      )}
    </SafeAreaView>
  );
};

export default Main;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'stretch',
  },
  locationText: {
    fontSize: 16,
    color: 'black',
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
