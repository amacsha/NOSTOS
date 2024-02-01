import React from "react";
import { Button, Text } from "react-native";

const Mission: React.FC = ({ navigation }: any) => {
  return (
    <>
      <Text>Mission component</Text>
      <Button title="Go to location" onPress={() => navigation.navigate("Location")} />
    </>
  );
};

export default Mission;
