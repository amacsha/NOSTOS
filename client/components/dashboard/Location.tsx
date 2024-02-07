import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  GestureResponderEvent,
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
import { SafeAreaView } from "react-native-safe-area-context";

const Location: React.FC = ({ navigation }: any) => {
  const locationName = useSelector((state: RootState) => state.places.selectedPlaceName);

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

  useEffect(() => {
    placeId != null && placeFetcher(placeId, setPlaceEntries);
  }, [placeId, entryId]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.locationName}>{locationName}</Text>
      
      {placeId ? (
        <View>
          <EntriesView entries={placeEntries}></EntriesView>
          <View style={styles.addEntryContainer}>
            <Pressable
              style={styles.addEntryButton}
              onPress={() => navigation.navigate("NewEntryForm")}
            >
              <Text style={styles.addEntryButtonText}>Create a new entry</Text>
            </Pressable>
          </View>
        </View>

      ) : (
        <Text style={styles.fetchingText}>
          Sending position to the Mothership...
        </Text>
      )}
    </SafeAreaView>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGrey,
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
    height: 60,
    bottom: 30
  },
  entryTxt: {
    fontSize: 14,
    color: colors.gunMetalGrey,
    fontFamily: "Gruppe_A",
    textAlign: "center",
    padding: 10,
  },
  locationName: {
    fontSize: 40,
    margin: 15,
    color: "white",
    fontFamily: "Gruppe_A",
  },
  addEntryContainer: {
    alignItems: "center",
  },
  addEntryButton: {
    borderWidth: 2,
    borderColor: "white",
    padding: 5
  },
  addEntryButtonText: {
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: "Gruppe_A",
    fontSize: 20,
    color: "white"
  },
});
