import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  GestureResponderEvent,
  SafeAreaView,
} from "react-native";
import GeoLocation from "./GeoLocation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import { getValueFor } from "../../utils/secureStorage"; // DOM TEST

import { SmallEntry } from "../../client-types/SmallEntry";
import EntriesView from "./EntriesView";
import { cityFetcher, getActiveMissions } from "./DashboardsServices";
import { Place } from "../../client-types/Place";
import MissionView from "./MissionView";
import Logout from "../logout/Logout";
import axios from "axios";

const Main: React.FC = ({ navigation }: any) => {
  const fetchLocation = GeoLocation();
  const location = useSelector((state: RootState) => state.location);
  const userId = useSelector((state: RootState) => state.user.id);
  const [cityEntries, setCityEntries] = useState<
    (SmallEntry & { avg: number })[]
  >([]);
  const [activeMissions, setActiveMissions] = useState<Place[]>([]);

  const asyncFetchLocation = async () => {
    await fetchLocation();
  };

  useEffect(() => {
    asyncFetchLocation();
  }, []);

  useEffect(() => {
    location.value?.cityName != undefined &&
      cityFetcher(location.value?.cityName, setCityEntries);
  }, [location]);

  useEffect(() => {
    userId && getActiveMissions(userId, setActiveMissions);
  }, [userId]);

  return (
    <View style={styles.container}>
      <View>
        <Logout></Logout>
        <Button
          title="Go to mission"
          onPress={() => navigation.navigate("Mission")}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.locationText}>
            CITY: {location.value?.cityName}
          </Text>
          {activeMissions.length == 0 ? (
            <Text style={styles.locationText}>
              No active missions available
            </Text>
          ) : (
            <MissionView places={activeMissions}></MissionView>
          )}
        </View>
      </View>
      {location ? (
        <View style={{ flex: 7, borderWidth: 2 }}>
          <EntriesView entries={cityEntries}></EntriesView>
        </View>
      ) : (
        <Text style={styles.fetchingText}>
          Sending position to the Mothership...
        </Text>
      )}
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f1f1f",
    justifyContent: "flex-start",
    alignItems: "stretch",
    fontFamily: "Gruppe_A",
  },
  textWrapper: {
    justifyContent: "center",
    fontFamily: "Gruppe_A",
  },
  locationText: {
    fontSize: 16,
    color: "#ffffff",
    fontFamily: "Gruppe_A",
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
});
