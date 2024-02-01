import { View, Text } from "react-native"

export default function OneComment({content, userName}: any) {
  if (content) {
    return (
      <View>
      <Text>{userName} said {content}</Text>
    </View>
    )
  }

  // return <Text>loading</Text>
}