// import React, {useState, useEffect} from "react";
// import { Text, View } from "react-native";
// import { getAverageRating } from "./EntryService";

// import { Rating } from "react-native-ratings";

// export default function AverageRating ({entryId}: any) {
//   //TODO make average rating update when the user updates his rating, will need redux for this
//   const [rating, setRating] = useState<number | undefined>(undefined)

//   const load = async () => {
//     const response = await getAverageRating(entryId);
//     setRating(response)
//   }

//   useEffect(() => {load()}, []);

//   if (rating === undefined) return <Text>Loading...</Text>
//   return (
//     <View>
//       <Text>Average Rating: {rating}</Text>
//       <Rating readonly showRating showReadOnlyText={false} startingValue={rating} fractions={2}/>
//     </View>
//   )
// }