import React, { useEffect, useState } from "react"
import { Text, View, Button, ActivityIndicator, StyleSheet, Pressable } from "react-native"
import { getAverageRating, getRating, updateRating, countRatings } from "./EntryService"

// import AverageRating from "./AverageRating"

import { Rating } from "react-native-ratings"

export default function UserRating({ userId, entryId }: any) {
  //TODO CHANGE TO REDUX?
  const [rating, setRating] = useState<number | undefined>(undefined)
  const [avgRating, setAvgRating] = useState<number | undefined>(undefined)

  async function load() {
    const currentRatingResponse = await getRating(entryId, userId);
    const averageRatingResponse = await getAverageRating(entryId);

    if (currentRatingResponse.data) {
      setRating(currentRatingResponse.data.value);
    }

    setAvgRating(averageRatingResponse);
  }


  useEffect(() => { load() }, [rating]);

  async function handleClick(value: number) {
    await updateRating(entryId, userId, value)
    await load();
  }

  // if (rating == undefined || avgRating == undefined){
  //   return (
  //     <>
  //       <Text>No ratings yet, be the first one to rate this entry!</Text>
  //       {/* <ActivityIndicator /> */}
  //     </>
  //   )
  // }

  return (
    <View style={styles.container}>
      {rating === undefined ?
        <Text style={styles.userRating}>Choose your rating {rating}</Text>
        :
        <Text style={styles.userRating}>Your rating: {rating}</Text>
      }

      <View style={styles.buttonContainer}>
        <Pressable onPress={() => handleClick(1)} style={styles.button}>
          <Text style={styles.buttonText}>1</Text>
        </Pressable>
        <Pressable onPress={() => handleClick(2)} style={styles.button}>
          <Text style={styles.buttonText}>2</Text>
        </Pressable>
        <Pressable onPress={() => handleClick(3)} style={styles.button}>
          <Text style={styles.buttonText}>3</Text>
        </Pressable>
        <Pressable onPress={() => handleClick(4)} style={styles.button}>
          <Text style={styles.buttonText}>4</Text>
        </Pressable>
        <Pressable onPress={() => handleClick(5)} style={styles.button}>
          <Text style={styles.buttonText}>5</Text>
        </Pressable>
      </View>

    <Text style={styles.avgRating}>Average: {avgRating?.toFixed(1)}</Text>
    </View>

//     {/* <Rating showRating startingValue={rating} onFinishRating={(val: number) => handleClick(val)} /> */}
//     {/* <Rating readonly showRating showReadOnlyText={false} startingValue={avgRating} fractions={2} /> */}
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: 'Gruppe_A', 
  },
  userRating: {
    alignItems: "center",
    fontSize: 25,
    fontFamily: 'Gruppe_A', 
  },
  avgRating: {
    fontSize: 25,
    fontFamily: 'Gruppe_A', 
  },
  buttonContainer: {
    flexDirection: "row",
    fontFamily: 'Gruppe_A', 
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: 'Gruppe_A', 
  },
  buttonText: {
    fontSize: 25,
    margin: 5,
    fontFamily: 'Gruppe_A', 
  }
})