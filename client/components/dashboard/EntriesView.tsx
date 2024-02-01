import { View, Text, StyleSheet, Button, GestureResponderEvent } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import React, { useMemo, useState } from 'react';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';

import { SmallEntry } from '../../client-types/SmallEntry';
import EntryCard from './EntryCard';
import { ScrollView } from 'react-native-gesture-handler';



const EntriesView: React.FC<{entries: (SmallEntry & {avg: number})[]}> = ({ entries } : {entries: (SmallEntry & {avg: number})[]}) => {
  // const filter_preference = useSelector((state: RootState) => state.user.filter_preference);
  const [filter_preference, setFilterPrefrence] = useState("top rated")

  const radioButtons: RadioButtonProps[] = useMemo(() => ([
    {
        id: 'top rated',
        label: 'top rated',
        value: 'top rated'
    },
    {
        id: 'recent',
        label: 'recent',
        value: 'recent'
    }
  ]), []);

  const handlePrefrenceChange = (newPrefrence: string) => {
    
  }

  return (
    <View style={styles.entryView}>
        <View>
            <Text>Filter by: {filter_preference}</Text>
            <RadioGroup 
              radioButtons={radioButtons} 
              onPress={setFilterPrefrence}
              selectedId={filter_preference}
              layout='row'
            />
        </View>
        <View style={{flexGrow: 1}}>
        {entries.sort((a, b) => {
            return filter_preference == 'recent' ? 
            new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime()  :
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
  },
});
