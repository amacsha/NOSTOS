import { View, Text, StyleSheet, Button, GestureResponderEvent } from 'react-native';
import React, { useMemo, useState } from 'react';

import { Place } from '../../client-types/Place';
import MissionCard from './MissionCard';
import { ScrollView } from 'react-native';


const MissionView: React.FC<{places: Place[]}> = ({ places } : {places: Place[]}) => {
  return (
    <View style={styles.entryView}>
        <Text>Active Missions:</Text>
        <ScrollView>
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
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    borderColor: 'black',
    borderWidth: 2,
    flexGrow: 1
  },
});
