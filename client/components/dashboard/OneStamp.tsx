import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function OneStamp ({image, description}: {image: string, description: string}) {

 return (
  <View style={styles.mainContainer}>
    <View style={styles.stampContainer}>
      <Text style={styles.stamp}>{image}</Text>
    </View>

    <View style={styles.textContainer}>

      <Text style={styles.text}>
        {description}
      </Text>

    </View>
  </View>
 )
}

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    width: 100,
    margin: 5,
  },
  stampContainer: {
    alignItems: 'center',
    flex: 1
  },
  textContainer: {
    fontFamily: "Gruppe_A",
    alignItems: 'center'

  },
  text: {
    fontFamily: "Gruppe_A",
    fontSize: 10,
  },
  stamp: {
    fontSize: 50
  }
})