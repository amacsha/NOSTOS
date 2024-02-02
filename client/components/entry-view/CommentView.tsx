import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OneComment from "./OneComment";
import { getUsernameFromID } from "./EntryService";

export default function CommentView({ comments }: any) {
  const [commentsWithUsernames, setCommentsWithUsernames] = useState<any>([]);

  useEffect(() => {
    async function load() {
      const renderPromises = comments.map(
        async (comment: any, index: number) => {
          const userName = await getUsernameFromID(comment.commenterId);
          return (
            <View style={styles.comment} key={index}>
              <OneComment
                key={comment.commenterId}
                content={comment.content}
                userName={userName}
              />
            </View>
          );
        }
      );

      const renderedComments = await Promise.all(renderPromises);
      setCommentsWithUsernames(renderedComments);
    }

    load();
  }, []);

  if (commentsWithUsernames.length > 0) {
    return (
      <>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Comments: </Text>
        </View>
        <ScrollView>{commentsWithUsernames}</ScrollView>
      </>
    );
  } else {
    return <ActivityIndicator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 2,
  },
  titleContainer: {
    borderBottomWidth: 1,
  },
  title: {
    paddingLeft: 15,
    paddingTop: 5,
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 5,
  },
  comment: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "purple",
    margin: 5,
  },
});
