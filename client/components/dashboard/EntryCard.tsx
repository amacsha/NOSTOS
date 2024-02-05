import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SmallEntry } from '../../client-types/SmallEntry';

import { useAppDispatch } from '../../hooks';
import { selectEntry } from '../../slices/entriesSlice';
import React from 'react';
import { colors } from '../styles/colors';



const EntryCard: React.FC<{ entry: SmallEntry & { avg: number } }> = ({ entry }: { entry: SmallEntry & { avg: number } }) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  return (
    <Pressable onPress={() => { dispatch(selectEntry(entry.id)); navigation.navigate("EntryView" as never) }} style={styles.card}>
      {entry.id ? (
        <View style={styles.entryContainer}>

          <Text style={styles.entryTitle}>{entry.title}</Text>

          <View style={styles.entryDetails}>

            <Text style={styles.entrySmallText}>{entry.creation_date}</Text>

            <Text style={styles.entrySmallText}>tags: {entry.tag.join(", ")}</Text>

          </View>
        </View>
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.darkGrey,
    padding: 10,
    marginVertical: 7,
    marginHorizontal: 10,
    borderRadius: 2,
    height: 80,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontFamily: 'Gruppe_A',
  },
  entryContainer: {
    fontFamily: 'Gruppe_A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 5,
    width: '100%',
  },
  entryTitle: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: 'bold',
    flex: 1,
    fontFamily: 'Gruppe_A',
  },
  entryDetails: {
    alignItems: 'flex-end',
    flex: 1,
    fontFamily: 'Gruppe_A',
  },
  entrySmallText: {
    fontSize: 10,
    color: '#ffffff',
    marginTop: 4,
    fontFamily: 'Gruppe_A',
  },
});

export default EntryCard;
