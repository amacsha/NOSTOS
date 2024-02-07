import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from "react-native";
import { getAverageRating, getRating, updateRating } from "./EntryService";
import { getValueFor } from "../../utils/secureStorage";

import { colors } from "../styles/colors";

export default function UserRating({ userId, entryId }: any) {
  //TODO CHANGE TO REDUX?
  const [rating, setRating] = useState<number | undefined>(0);
  const [avgRating, setAvgRating] = useState<number | undefined>(0);

  const [userRatingStars, setUserRatingStars] = useState<boolean[]>(
    Array(5).fill(false)
  );
  const [averageRatingStars, setAverageRatingStars] = useState<boolean[]>(
    Array(5).fill(false)
  );

  const token: string = getValueFor("accessToken") || "";

  async function load() {
    const currentRatingResponse = await getRating(entryId, userId);
    const averageRatingResponse = await getAverageRating(entryId);

    if (currentRatingResponse.data) {
      setRating(currentRatingResponse.data.value);
      updateUserRatingStars(currentRatingResponse.data.value - 1);
    }

    if (averageRatingResponse) {
      setAvgRating(averageRatingResponse.toFixed(0));
      updateAverageRatingStars(averageRatingResponse.toFixed(0) - 1);
    }
  }

  useEffect(() => {
    load();
  }, [rating]);

  function updateUserRatingStars(x: number) {
    setUserRatingStars(() => {
      const update = Array(5).fill("☆");
      for (let i = 0; i <= x; i++) {
        update[i] = true;
      }
      return update;
    });
  }
  function updateAverageRatingStars(x: number) {
    setAverageRatingStars(() => {
      const update = Array(5).fill("☆");
      for (let i = 0; i <= x; i++) {
        update[i] = true;
      }
      return update;
    });
  }

  async function handleClick(value: number) {
    updateUserRatingStars(value);
    updateRating(entryId, userId, value + 1, token);

    //Fake the average rating updating if there are no current ratings.
    //Re-loading the true value from the DB causes
    //a nasty re-render, and with enough ratings the average wouldn't shift much
    //from just a single update
    if (avgRating === 0) {
      setAvgRating(value);
      updateAverageRatingStars(value);
    }
  }

  let userRatingButtons: JSX.Element[] = [];
  for (let i = 0; i < 5; i++) {
    userRatingButtons.push(
      <Pressable key={i} onPress={() => handleClick(i)}>
        <Text style={styles.stars}>
          {userRatingStars[i] === true ? "★" : "☆"}
        </Text>
      </Pressable>
    );
  }
  let averageRatingButtons: JSX.Element[] = [];
  for (let i = 0; i < 5; i++) {
    averageRatingButtons.push(
      <Text key={i} style={styles.stars}>
        {averageRatingStars[i] === true ? "★" : "☆"}
      </Text>
    );
  }
  // ⭐️☆★✦✦✧
  //◐ ○ ●

  return (
    <>
      <View style={styles.main}>
        <View style={styles.userRatingOuter}>
          <View>
            <Text style={styles.text}>Your Rating</Text>
          </View>

          <View style={styles.stars}>{userRatingButtons}</View>
        </View>

        <View style={styles.averageRatingOuter}>
          <View>
            <Text style={styles.text}>Average</Text>
          </View>

          <View style={styles.stars}>{averageRatingButtons}</View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    margin: 15,
    flexDirection: "row",
  },
  userRatingOuter: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontFamily: "Gruppe_A",
  },
  stars: {
    flexDirection: "row",
    fontSize: 25,
    // margin: 5,
    color: colors.basePurple,
  },
  averageRatingOuter: {
    flex: 1,
    alignItems: "center",
  },
});
