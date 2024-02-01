import { View, Text, StyleSheet, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Place } from '../../client-types/Place';

import { useAppDispatch } from '../../hooks';

import { selectPlace } from '../../slices/placesSlice';
import React from 'react';

const MissionCard: React.FC<{place: Place}> = ({ place } : {place: Place}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  
  return (
    <Pressable onPress={() => {dispatch(selectPlace(place.id));navigation.navigate("Location" as never)}} style={styles.card}>
      <View>
        <Text style={styles.entryTitle}>{place.name}</Text>
      </View>
    </Pressable>
  );
};

export default MissionCard;


const styles = StyleSheet.create({
    card: {
    backgroundColor: '#ebff78',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderColor: 'black',
    borderWidth: 2,
  },
  entrySmallText: {
    fontSize: 11,
    color: 'black',
  },
  entryTitle: {
    fontSize: 20,
    color: 'black',
  },
});
