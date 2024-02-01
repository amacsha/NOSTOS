import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, Button } from "react-native";

const Mission: React.FC = ({navigation}: any) => {
  return (
    <>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE}></MapView>
      <Text>Mission component</Text>
      <Button
        title="Go to location"
        onPress={() => navigation.navigate("Location")}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "80%",
  },
});

export default Mission;
