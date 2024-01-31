import { View, Text, StyleSheet, Button, GestureResponderEvent } from 'react-native';

import { SmallEntry } from '../../client-types/SmallEntry';

const EntryCard: React.FC<{entry: SmallEntry}> = ({ entry } : {entry: SmallEntry}) => {
  return (
    <View style={styles.card}>
      {entry.id ? 
      <View>
        <Text style={styles.entryTitle}>{entry.title}</Text>
        <Text style={styles.entrySmallText}>{entry.creation_date}</Text>
        <Text style={styles.entrySmallText}>tags: {entry.tag.join(", ")}</Text>
      </View> : ""}
    </View>
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
