import React, { useEffect, useState } from "react"
import { Text, View, Button, ActivityIndicator } from "react-native"
import { getAverageRating, getRating, updateRating, countRatings } from "./EntryService"

// import AverageRating from "./AverageRating"

import { Rating } from "react-native-ratings"

export default function UserRating( {userId, entryId }: any) {
  //TODO CHANGE TO REDUX?
  const [rating, setRating] = useState<number>(0)
  const [avgRating, setAvgRating] = useState<number>(0)
  let currentRatingCount = 0;

  async function load() {
    currentRatingCount = await countRatings(entryId);

    const user = await getRating(entryId, userId);
    const avg = await getAverageRating(entryId);

    if (user.data) setRating(user.data.value);
    setAvgRating(avg);
  }

  useEffect(() => {load()}, [rating]);

  async function handleClick(value: number) {
    const newAverage = avgRating + ( (value - rating) / currentRatingCount);
    console.log(newAverage)

    setRating(value);
    //setAvgRating(newAverage);

    updateRating(entryId, userId, value)
  }

  return (
    <View>
      <Text>Your rating</Text>
        <Rating showRating startingValue={rating as number} onFinishRating={(val: number) => handleClick(val)}/>
        {/* <AverageRating entryId={entryId}/> */}
        <Text>Average Rating</Text>
        <Rating readonly showRating showReadOnlyText={false} startingValue={avgRating} fractions={2}/>
    </View>
  )
}