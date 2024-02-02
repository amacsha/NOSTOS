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
  const [commentsWithUsernames, setCommentsWithUsernames] = useState<JSX.Element[]>([]);

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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Comments: </Text>
        </View>
        <ScrollView style={styles.commentContainer}>
          {commentsWithUsernames}
          </ScrollView>
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
    fontFamily: 'Gruppe_A', 
  },
  titleContainer: {
    borderBottomWidth: 1,
    fontFamily: 'Gruppe_A', 
  },
  title: {
    paddingLeft: 15,
    paddingTop: 5,
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 5,
    fontFamily: 'Gruppe_A', 
  },
  comment: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "w",
    margin: 5,
    fontFamily: 'Gruppe_A', 
  },
  commentContainer: {
    backgroundColor: '1f1f1f',
    fontFamily: 'Gruppe_A', 
  }
});
