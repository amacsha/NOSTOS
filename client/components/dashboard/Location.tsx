import React from "react";
import { View, Text, StyleSheet, Button, GestureResponderEvent, SafeAreaView } from 'react-native';
import GeoLocation from './GeoLocation';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { useState, useEffect } from "react";

import { SmallEntry } from '../../client-types/SmallEntry';
import EntriesView from './EntriesView';
import { placeFetcher } from './DashboardsServices';
import { useAppDispatch } from "../../hooks";
import { selectPlace } from "../../slices/placesSlice";

const Location: React.FC = ({navigation}: any) => {
  const placeId = useSelector((state: RootState) => state.places.selectedPlaceId);
  const userId =  useSelector((state: RootState) => state.user.id);
  const [placeEntries, setPlaceEntries] = useState<(SmallEntry & {avg: number})[]>([])

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(selectPlace(1))
  })

  useEffect(() => {
    placeId != null && placeFetcher(placeId, setPlaceEntries)
  }, [placeId]);


  return (
    <View style={styles.container}>
      {placeId ? (
        <View style={{flex: 7, borderColor: 'green',
        borderWidth: 2,}}>
          <EntriesView entries={placeEntries}></EntriesView>
        </View>
      ) : (
        <Text style={styles.fetchingText}>Sending position to the Mothership...</Text>
      )}
      {placeEntries.every((entry) => entry.authorId != userId) && 
        <View style={{flex: 1}}>
          <Button title="Write a new entry" onPress={() => navigation.navigate('NewEntryForm')} />
        </View>
      }
    </View>
  )
}

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'stretch',
    padding: 10,
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