import { View, Text, StyleSheet, ScrollView } from "react-native"

export default function OneComment({ content, userName }: any) {
  if (content) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.content}>{userName}: "{content}".</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 15

  },
  username: {
  },
  content: {
    color: 'white'
  }
})