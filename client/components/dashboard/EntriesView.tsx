import { View, Text, StyleSheet, Button, GestureResponderEvent } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import React, { useEffect, useMemo, useState } from 'react';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';

import { SmallEntry } from '../../client-types/SmallEntry';
import EntryCard from './EntryCard';
import { ScrollView } from 'react-native';

import { useAppDispatch } from '../../hooks';
import { updatePrefrence, getPrefrence } from './DashboardsServices';

const EntriesView: React.FC<{entries: (SmallEntry & {avg: number})[]}> = ({ entries } : {entries: (SmallEntry & {avg: number})[]}) => {
  const filter_preference = useSelector((state: RootState) => state.user.filter_preference);
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    userId && getPrefrence(dispatch, userId)
  }, [userId])

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

  return (
    <View style={styles.entryView}>
        <View>
            <Text>Filter by: {filter_preference}</Text>
            <RadioGroup 
              radioButtons={radioButtons} 
              onPress={(newPref) => userId != null && updatePrefrence(newPref, dispatch, userId)}
              selectedId={filter_preference == null? undefined : filter_preference}
              layout='row'
            />
        </View>
        <ScrollView>
        {entries.sort((a, b) => {
            return filter_preference == 'recent' ? 
            new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime()  :
            b.avg - a.avg
        }).map((entry) => {
            return <EntryCard entry={entry} key={entry.id}/>
        })}
        </ScrollView>
    </View>
  );
};

export default EntriesView;


const styles = StyleSheet.create({
  entryView: {
    backgroundColor: '#1f1f1f',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 1,
    borderColor: '#333',
    gap: 5,
    borderWidth: 2,
    flexGrow: 1
  },
});
