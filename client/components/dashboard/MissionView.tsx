import { View, Text, StyleSheet, Button, GestureResponderEvent } from 'react-native';
import React, { useMemo, useState } from 'react';

import { Place } from '../../client-types/Place';
import MissionCard from './MissionCard';
import { ScrollView } from 'react-native';
import { colors } from '../styles/colors';


const MissionView: React.FC<{places: Place[]}> = ({ places } : {places: Place[]}) => {
  return (
    <View style={styles.entryView}>
        <Text style={styles.entryViewText}>Active Missions:</Text>
        <ScrollView horizontal>
        {places.map((place) => {
            return <MissionCard place={place} key={place.id}/>
        })}
        </ScrollView>
    </View>
  );
};

export default MissionView;


const styles = StyleSheet.create({
  entryView: {
    backgroundColor: colors.darkGrey,
    alignItems: 'center',
    borderColor: 'black',
    flexGrow: 1,
    fontFamily: 'Gruppe_A',
  },
  entryViewText: {
    alignContent: "center",
    color: "white",
    fontFamily: 'Gruppe_A',
    paddingBottom: 5,
  }
});
