import { View, Text, StyleSheet, Button, GestureResponderEvent } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { SmallEntry } from '../../client-types/SmallEntry';
import EntryCard
 from './EntryCard';
const EntriesView: React.FC<{entries: (SmallEntry & {avg: number})[]}> = ({ entries } : {entries: (SmallEntry & {avg: number})[]}) => {
  const filterPrefrence = useSelector((state: RootState) => state.user.filter_preference);

  return (
    <View style={styles.entryView}>
        <View>
            <Text>filter: {filterPrefrence}</Text>
        </View>
        <View>
        {entries.sort((a, b) => {
            return filterPrefrence == 'recent' ? 
            new Date(b.creation_date).getMilliseconds() - new Date(a.creation_date).getMilliseconds() :
            b.avg - a.avg
        }).map((entry) => {
            return <EntryCard entry={entry} key={entry.id}/>
        })}
        </View>
    </View>
  );
};

export default EntriesView;


const styles = StyleSheet.create({
  entryView: {
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    borderColor: 'black',
    borderWidth: 2,
    flex: 1
  },
});
