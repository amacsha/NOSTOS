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
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Comment } from "../../client-types/Comment";

export default function CommentView() {
  const comments = useSelector((state: RootState) => state.comments);
  const [commentsWithUsernames, setCommentsWithUsernames] = useState<
    JSX.Element[]
  >([]);

  useEffect(() => {
    async function load() {
      const renderPromises = comments.map(
        async (comment: Comment, index: number) => {
          const userName: string = await getUsernameFromID(comment.commenterId);
          return (
            <View style={styles.comment} key={index}>
              <OneComment
                key={comment.commenterId}
                content={comment.content}
                date={comment.creation_date as Date}
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
  }, [comments]);

  if (commentsWithUsernames.length > 0) {
    return (
      <>
        <View style={styles.mainContainer}>
          <View>
            <Text style={styles.title}>Comments</Text>
          </View>

          <ScrollView>{commentsWithUsernames}</ScrollView>
        </View>
      </>
    );
  } else {
    return <Text style={styles.title}>No comments yet.</Text>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 15,
  },
  title: {
    alignSelf: "center",
    paddingBottom: 10,
    fontSize: 20,
    fontFamily: "Gruppe_A",
    color: 'white'
  },
  comment: {
    fontFamily: "Gruppe_A",
    fontSize: 12,
    margin: 5,
  },
});
