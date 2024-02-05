import { View, Text, StyleSheet, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Place } from '../../client-types/Place';

import { useAppDispatch } from '../../hooks';

import { selectPlace } from '../../slices/placesSlice';
import React from 'react';
import { colors } from '../styles/colors';

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
    backgroundColor: colors.lighterPurple,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    fontFamily: 'Gruppe_A',
  },
  entryTitle: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Gruppe_A',
  },
});
