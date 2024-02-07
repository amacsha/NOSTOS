import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import moment from "moment";
import Typewriter from "../../utils/TypewriterLoading";

type CommentProps = {
  content: string;
  userName: string;
  date: Date;
};

export default function OneComment({ content, userName, date }: CommentProps) {
  if (content) {
    const titleString: string = `${userName}, ${moment(date).fromNow()}:`;
    const contentWithQuotes = `"${content}"`;
    return (
      <>
        <Text style={styles.userName}>
          <Typewriter text={titleString} delay={5} />
        </Text>

        <Text style={styles.content}>
          <Typewriter text={contentWithQuotes} delay={5} />
        </Text>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  userName: {
    fontSize: 16,
    fontFamily: "Gruppe_A",
  },
  content: {
    paddingLeft: 20,
    fontSize: 20,
    fontFamily: "Gruppe_A",
  },
});
