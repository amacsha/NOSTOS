import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, GestureResponderEvent, SafeAreaView } from 'react-native';
import GeoLocation from './GeoLocation';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { SmallEntry } from '../../client-types/SmallEntry';
import EntriesView from './EntriesView';


const Main: React.FC = ({navigation}: any) => {
  const fetchLocation = GeoLocation();
  const location = useSelector((state: RootState) => state.location);
  const [cityEntries, setCityEntries] = useState<(SmallEntry & {avg: number})[]>([])

  useEffect(() => {
    fetchLocation();
    const avgs = [
      {
        "_avg": {
          "value": 4
        },
        "entryId": 1
      },
      {
        "_avg": {
          "value": 3
        },
        "entryId": 2
      }
    ]

    const rawentries = [
      {
        id: 2,
        authorId: 1,
        title: "Exciting Story!",
        creation_date: new Date().toDateString(),
        tag: ['fun', 'cool'],
      },
      {
        id: 1,
        authorId: 1,
        title: "Even more exciting Story!",
        creation_date: new Date().toDateString(),
        tag: ['fun', 'cool', 'cooler'],
      },
    ]
    setCityEntries(rawentries.map((entry) => {
      return {...entry, avg: avgs.find(a => a.entryId == entry.id)?._avg.value || 0}
    }))
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 2}}>
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
      <View style={styles.bottom}>
        <Button title='Go to mission' onPress={(event: GestureResponderEvent) => navigation.navigate('Mission')} />
      </View>
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
    paddingVertical: 40,
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
