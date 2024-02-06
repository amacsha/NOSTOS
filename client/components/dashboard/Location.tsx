import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  GestureResponderEvent,
  SafeAreaView,
  Pressable,
} from "react-native";
import GeoLocation from "./GeoLocation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useState, useEffect } from "react";
import { SmallEntry } from "../../client-types/SmallEntry";
import EntriesView from "./EntriesView";
import { placeFetcher } from "./DashboardsServices";
import { selectEntry } from "../../slices/entriesSlice";
import { colors } from "../styles/colors";

const Location: React.FC = ({ navigation }: any) => {
  const placeId = useSelector(
    (state: RootState) => state.places.selectedPlaceId
  );
  const entryId = useSelector(
    (state: RootState) => state.entries.selectedEntryID
  );
  const userId = useSelector((state: RootState) => state.user.id);
  const [placeEntries, setPlaceEntries] = useState<
    (SmallEntry & { avg: number })[]
  >([]);

  console.log(placeId);

  useEffect(() => {
    placeId != null && placeFetcher(placeId, setPlaceEntries);
  }, [placeId, entryId]);

  return (
    <View style={styles.container}>
      {placeId ? (
        <View style={{ paddingTop: 50 }}>
          <EntriesView entries={placeEntries}></EntriesView>
          <View>
            <Pressable
              style={styles.entryBtn}
              onPress={() => navigation.navigate("NewEntryForm")}
            >
              <Text style={styles.entryTxt}> Write a new entry </Text>
            </Pressable>
          </View>

          {placeEntries.every((entry) => entry.authorId != userId) && (
            <View style={styles.entryBtn}>
              <Pressable
                style={styles.entryBtn}
                onPress={() => navigation.navigate("NewEntryForm")}
              >
                {/* <Text style={styles.entryTxt}> Write a new entry </Text> */}
              </Pressable>
            </View>
          )}
        </View>

      ) : (
        <Text style={styles.fetchingText}>
          Sending position to the Mothership...
        </Text>
      )}
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.basePurple,
    alignItems: "stretch",
    padding: 10,
    fontFamily: "Gruppe_A",
  },
  fetchingText: {
    fontSize: 14,
    color: "#ffffff",
    fontFamily: "Gruppe_A",
  },
  entryBtn: {
    backgroundColor: colors.lighterPurple,
  },

  entryTxt: {
    fontSize: 14,
    color: colors.gunMetalGrey,
    fontFamily: "Gruppe_A",
    textAlign: "center",
    padding: 10,
  },

  // locationText: {
  //   fontSize: 16,
  //   color: 'black',
  //   marginBottom: 10,
  //   fontFamily: 'Gruppe_A',
  // },
  // fetchingText: {
  //   fontSize: 14,
  //   color: 'gray',
  //   fontFamily: 'Gruppe_A',
  // },
  // bottom: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   fontFamily: 'Gruppe_A',
  // }
});
