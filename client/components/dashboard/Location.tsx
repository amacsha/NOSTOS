import React from "react";
import { Button, Text } from "react-native";

const Location: React.FC = ({navigation}: any) => {
  return (
    <>
      <Text>Location with entries</Text>
      <Button title="Go to specific entry" onPress={() => navigation.navigate('EntryView')} />
      <Button title="Write a new entry" onPress={() => navigation.navigate('NewEntryForm')} />
    </>
  );
}

export default Location;
