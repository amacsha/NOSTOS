import React, { useEffect, useState } from "react";
import { Animated, ImageBackground, Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
import { useAppDispatch } from "../../hooks";
import { setLocation } from "../../slices/locationSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { backstory } from "../../assets/backstory/bs";

const bs = backstory

const GlobeViewApp: React.FC = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const location = useSelector((state: RootState) => state.location);
  const [showLogPopup, setShowLogPopup] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0.5));

  useEffect(() => {
    if (showLogPopup) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0.99,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      fadeAnim.setValue(0.5);
    }
  }, [showLogPopup]);


  const handlePress = (cityName: string) => {
    if (location.value?.lat && location.value.lng) {
      dispatch(
        setLocation({
          cityName,
          lng: location.value.lng,
          lat: location.value.lat,
        })
      );
      navigation.navigate("Logs");
    }
  };

  const toggleLogPopup = () => {
    setShowLogPopup(!showLogPopup);
  };

  return (
    <>
      <ImageBackground
        style={styles.globe}
        source={require("../../assets/spspsp.png")}
      />

      <Pressable style={styles.logButton} onPress={toggleLogPopup}>
        <Text style={styles.locationButtonText}>logs</Text>
      </Pressable>

      {showLogPopup && (
        <Animated.View
          style={[
            styles.logPopUp,
            { opacity: fadeAnim },
          ]}
        >
          <ScrollView>
            <Text style={styles.locationButtonText}>{backstory.bs}</Text>
          </ScrollView>
        </Animated.View>
      )}

      <View style={styles.locationButtonWrapper}>
        <Pressable
          style={styles.LondonButton}
          onPress={() => handlePress("London")}
        >

          <Text style={[
            styles.locationButtonText,
            location.value?.cityName === "London" && {
              color: colors.lighterPurple,
            },
          ]}>
            London
          </Text>
        </Pressable>

        <Pressable
          style={styles.BerlinButton}
          onPress={() => handlePress("Berlin")}
        >
          <Text style={[
            styles.locationButtonText,
            location.value?.cityName === "Berlin" && {
              color: colors.lighterPurple,
            },
          ]}>
            Berlin
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default GlobeViewApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#010000",
  },
  globe: {
    height: "100%",
    width: "100%"
  },
  logButton: {
    position: "absolute",
    fontFamily: "Gruppe_A",
    bottom: 59,
    left: 162,
    height: 44,
  },
  popUpContainer: {
    position: "absolute",
    bottom: '14%', 
    left: '20%', 
    right: '20%', 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 44,
  },
  logPopUp: {
    position: "absolute",
    left: '50%',
    top: '50%',
    transform: [{ translateX: -150 }, { translateY: -250 }],
    width: 300,
    height: 400,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    shadowColor: "#0ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  locationButtonWrapper: {
    position: "absolute",
    bottom: '14%', 
    left: '18%', 
    right: '18%', 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 44,
  },
  LondonButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    color: "rgba(255, 255, 255, 0.7)",
  },
  BerlinButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    color: "rgba(255, 255, 255, 0.7)",
  },
  locationButtonText: {
    fontSize: 22,
    fontFamily: "Gruppe_A",
    color: "rgba(255, 255, 255, 0.9)",
  },
  selectedLocationText: {
    color: colors.lighterPurple,
  },
});
