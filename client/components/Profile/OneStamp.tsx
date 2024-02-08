import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
// import 1 from '../../assets/badges/'

export default function OneStamp ({image, description}: {image: any, description: string}) {
  // const path = '../../assets/badges' + image;
 return (
  <View style={styles.mainContainer}>
    <Image source={image} style={styles.stamp}/>
    <Text style={styles.text}>
        {description}
    </Text>

  </View>
 )
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 20
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
    paddingTop: 8,
    fontFamily: "Gruppe_A",
    fontSize: 10,
    maxWidth: 100,
    textAlign: 'center',
    color: 'white',
  },
  stamp: {
    height: 100,
    width: 100,
  }
})