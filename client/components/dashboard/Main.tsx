import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import GeoLocation from "./GeoLocation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { SmallEntry } from "../../client-types/SmallEntry";
import EntriesView from "./EntriesView";
import {
  cityFetcher,
  getActiveMissions,
  getCities,
} from "./DashboardsServices";
import { Place } from "../../client-types/Place";
import MissionView from "./MissionView";
import { useAppDispatch } from "../../hooks";
import { colors } from "../styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { setActiveMission } from "../../slices/entriesSlice";

const Main: React.FC = ({ navigation }: any) => {
  const fetchLocation = GeoLocation();
  const location = useSelector((state: RootState) => state.location);
  const userId = useSelector((state: RootState) => state.user.id);
  const [cityEntries, setCityEntries] = useState<
    (SmallEntry & { avg: number })[]
  >([]);
  const [cityNames, setCityNames] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const activeMissions = useSelector(
    (state: RootState) => state.entries.activeMission
  );

  useEffect(() => {
    location.value?.cityName != undefined &&
      cityFetcher(location.value?.cityName, setCityEntries);
  }, [location.value?.cityName]);

  useEffect(() => {
    userId && getActiveMissions(userId, dispatch);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {activeMissions.length == 0 ? (
          <Text style={styles.locationText}>
            No active missions available
          </Text>
        ) : (
          <MissionView places={activeMissions}></MissionView>
        )}
      </View>
      {location.value?.cityName ? (
        <View style={styles.wrapper}>
          <EntriesView entries={cityEntries}></EntriesView>
        </View>
      ) : (
        <Text style={styles.fetchingText}>
          Sending position to the Mothership...
        </Text>
      )}
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.darkGrey,
    justifyContent: "flex-start",
    alignItems: "stretch",
    fontFamily: "Gruppe_A",
  },
  textWrapper: {
    justifyContent: "center",
    fontFamily: "Gruppe_A",
  },
  locationText: {
    textAlign: "center",
    padding: 40,
    fontSize: 16,
    color: colors.gunMetalGrey,
    fontFamily: "Gruppe_A",
    textShadowColor: "rgba(255, 255, 255, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  fetchingText: {
    fontSize: 14,
    color: "#ffffff",
    fontFamily: "Gruppe_A",
  },
  bottom: {
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Gruppe_A",
  },
  whiteText: {
    color: "white",
    fontFamily: "Gruppe_A",
  },
  blackText: {
    color: colors.black,
    fontFamily: "Gruppe_A",
  },
  dropdown: {
    backgroundColor: colors.black,
    borderColor: "white",
    borderWidth: 1,
  },
  selectedTags: {
    color: colors.lighterPurple,
    fontFamily: "Gruppe_A",
  },
});
