import { View, Text, StyleSheet, Button, GestureResponderEvent, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import React, { useEffect, useMemo, useState } from 'react';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import MultiSelect from 'react-native-multiple-select';

import { SmallEntry } from '../../client-types/SmallEntry';
import EntryCard from './EntryCard';
import { ScrollView } from 'react-native';

import { useAppDispatch } from '../../hooks';
import { updatePrefrence, getPrefrence } from './DashboardsServices';

import { colors } from '../styles/colors';

const EntriesView: React.FC<{entries: (SmallEntry & {avg: number})[]}> = ({ entries } : {entries: (SmallEntry & {avg: number})[]}) => {
  const filter_preference = useSelector((state: RootState) => state.user.filter_preference);
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useAppDispatch()
  const [selected, setSelected] = useState([])
  useEffect(() => {
    userId && getPrefrence(dispatch, userId)
  }, [userId])

  const radioButtons: RadioButtonProps[] = useMemo(() => ([
    {
      id: 'recent',
      value: 'recent',
      label: 'recent',
      color: colors.lighterPurple,
    },
    {
      id: 'top rated',
      value: 'top rated',
      label: 'top rated',
      color: colors.lighterPurple,
    },
  ]), []);

  return (
    <View style={styles.entryView}>
        <View>
            <Text style={styles.whiteText}>Filter by: {filter_preference}</Text>
            <RadioGroup 
              radioButtons={radioButtons} 
              onPress={(newPref) => userId != null && updatePrefrence(newPref, dispatch, userId)}
              selectedId={filter_preference == null? undefined : filter_preference}
              layout='row'
              labelStyle={styles.whiteText}
            />
            <MultiSelect
              items={
                [
                  ... new Set(entries.filter((entry) => 
                    selected.every(tag => 
                      entry.tag.includes(tag))
                  ).reduce((entryTags, entry) => 
                      entryTags.concat(entry.tag as never[]
                    ),[]
                  ))
                ].map((tag) => {
                    return {
                      id: tag,
                      name: tag,
                    }
                })
              }
              uniqueKey="id"
              onSelectedItemsChange={(selectedItems) => {setSelected(selectedItems as never[])}}
              selectedItems={selected}

              selectText="Filter by tags:"
              noItemsText="No tags found matching your search"
              fontFamily={styles.whiteText.fontFamily}

              styleItemsContainer={styles.dropdown}
              styleTextDropdown={styles.blackText}
              styleTextDropdownSelected={styles.blackText}

              tagBorderColor={styles.whiteText.color}
              tagTextColor={styles.whiteText.color}

              itemTextColor={styles.whiteText.color}
              itemFontFamily={styles.whiteText.fontFamily}

              submitButtonColor={styles.selectedTags.color}

              selectedItemTextColor={styles.selectedTags.color}
              selectedItemFontFamily={styles.selectedTags.fontFamily}
              selectedItemIconColor={styles.selectedTags.color}
              searchInputStyle={styles.blackText}
            />
        </View>
        <ScrollView>
        
        {entries.length > 0 ? 
        
        entries.filter((entry) => selected.every(tag => entry.tag.includes(tag))).sort((a, b) => {
            return filter_preference == 'recent' ? 
            new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime()  :
            b.avg - a.avg
        }).map((entry) => {
            return <EntryCard entry={entry} key={entry.id}/>
        }): <Text style={styles.whiteText}> Waiting For Entries...</Text>
            }
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
    flexGrow: 1,
    fontFamily: 'Gruppe_A',
  },
  whiteText: {
    color: 'white',
    fontFamily: 'Gruppe_A',
  },
  blackText: {
    color: colors.black,
    fontFamily: 'Gruppe_A',
  },
  dropdown: {
    backgroundColor: colors.black,
    borderColor: 'white',
    borderWidth: 1
  },
  selectedTags: {
    color: colors.lighterPurple,
    fontFamily: 'Gruppe_A',
  },
});
