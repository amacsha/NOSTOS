import { View, Text, StyleSheet, Button, GestureResponderEvent, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import React, { useEffect, useMemo, useState } from 'react';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import MultiSelect from 'react-native-multiple-select';

import { SmallEntry } from '../../client-types/SmallEntry';
import EntryCard from './EntryCard';
import { ScrollView } from 'react-native';

import { useAppDispatch } from '../../hooks';
import { updatePrefrence, getPrefrence } from './DashboardsServices';
import { getValueFor } from '../../utils/secureStorage';

import { colors } from '../styles/colors';

const EntriesView: React.FC<{ entries: (SmallEntry & { avg: number })[] }> = ({ entries }: { entries: (SmallEntry & { avg: number })[] }) => {
  const filter_preference = useSelector((state: RootState) => state.user.filter_preference);
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useAppDispatch()
  const [selected, setSelected] = useState([])
  useEffect(() => {
    userId && getPrefrence(dispatch, userId)
  }, [userId])
  const token: string = getValueFor("accessToken") || "";

  const radioButtons: RadioButtonProps[] = useMemo(() => ([
    {
      id: 'recent',
      value: 'recent',
      label: 'recent',
      color: colors.basePurple,
    },
    {
      id: 'top rated',
      value: 'top rated',
      label: 'top rated',
      color: colors.basePurple,
    },
  ]), []);

  return (
    <View style={styles.entryView}>
      <View style={styles.logsBody}>
        {/* <Text style={styles.whiteText}>Filter by: {filter_preference}</Text> */}

        <MultiSelect
          items={
            [
              ... new Set(entries.filter((entry) =>
                selected.every(tag =>
                  entry.tag.includes(tag))
              ).reduce((entryTags, entry) =>
                entryTags.concat(entry.tag as never[]
                ), []
              ))
            ].map((tag) => {
              return {
                id: tag,
                name: tag,
              }
            })
          }
          uniqueKey="id"
          onSelectedItemsChange={(selectedItems) => { setSelected(selectedItems as never[]) }}
          selectedItems={selected}

          selectText="Filter by tags:"
          noItemsText="No tags found matching your search"
          fontFamily={styles.whiteText.fontFamily}
          styleDropdownMenu={styles.dropdown}
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
      <View style={styles.filter}>
        {radioButtons.map((button) => (
          <Text
            key={button.id}
            style={filter_preference === button.value ? styles.selectedFilter : styles.whiteText}
            onPress={() => userId != null && updatePrefrence(button.value!, dispatch, userId, token)}
          >
            {button.label}
          </Text>
        ))}
      </View>
      <ScrollView>


        {entries.length > 0 ?

          entries.filter((entry) => selected.every(tag => entry.tag.includes(tag))).sort((a, b) => {
            return filter_preference == 'recent' ?
              new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime() :
              b.avg - a.avg
          }).map((entry) => {
            return <EntryCard entry={entry} key={entry.id} />
          }) : <Text style={styles.whiteText}> Waiting For Entries...</Text>
        }
      </ScrollView>
    </View>
  );
};

export default EntriesView;


const styles = StyleSheet.create({
  entryView: {
    fontFamily: 'Gruppe_A',
    backgroundColor: colors.lighterPurple,
    marginHorizontal: 10,
    alignItems: 'stretch',
    gap: 5,
  },
  logsBody: {
    marginTop: 20,
  },
  filter: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  whiteText: {
    fontFamily: 'Gruppe_A',
    color: 'white',
    flex: 1,
    textAlign: 'center',
    padding: 15,
    
  },
  selectedFilter: {
    fontFamily: 'Gruppe_A',
    backgroundColor: colors.basePurple,
    color: 'white',
    flex: 1,
    textAlign: 'center',
    padding: 15,
    
  },
  blackText: {
    fontFamily: 'Gruppe_A',
    color: colors.black,
    
  },
  dropdown: {
    backgroundColor: colors.black,
  },
  selectedTags: {
    fontFamily: 'Gruppe_A',
    color: colors.lighterPurple,
  },
});
