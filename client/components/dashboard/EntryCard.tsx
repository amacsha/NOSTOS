import { View, Text, StyleSheet, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SmallEntry } from '../../client-types/SmallEntry';

import { useAppDispatch } from '../../hooks';
import { selectEntry } from '../../slices/entriesSlice';

const EntryCard: React.FC<{entry: SmallEntry & {avg: number}}> = ({ entry } : {entry: SmallEntry & {avg: number}}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  
  return (
    <Pressable onPress={() => {dispatch(selectEntry(entry.id));navigation.navigate("EntryView" as never)}} style={styles.card}>
      {entry.id ? 
      <View>
        <Text style={styles.entryTitle}>{entry.title}</Text>
        <Text style={styles.entrySmallText}>{entry.creation_date}</Text>
        <Text style={styles.entrySmallText}>tags: {entry.tag.join(", ")}</Text>
      </View> : ""}
    </Pressable>
  );
};

export default EntryCard;


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
