import { View, Text, StyleSheet, Pressable, ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SmallEntry } from '../../client-types/SmallEntry';

import { useAppDispatch } from '../../hooks';
import { selectEntry } from '../../slices/entriesSlice';
import React from 'react';



const EntryCard: React.FC<{entry: SmallEntry & {avg: number}}> = ({ entry } : {entry: SmallEntry & {avg: number}}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  
  return (
    <Pressable onPress={() => {dispatch(selectEntry(entry.id));navigation.navigate("EntryView" as never)}} style={styles.card}>
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
    backgroundColor: '#9772b2',
    padding: 10,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 4,
    borderRadius: 2,
    height: 80, 
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontFamily: 'Gruppe_A', 
  },
  entryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    fontFamily: 'Gruppe_A',
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
