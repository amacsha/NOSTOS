import React, {useEffect, useState} from "react";
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OneComment from "./OneComment";
import { getUsernameFromID } from "./EntryService";

export default function CommentView ({comments}: any) {
  const [commentsWithUsernames, setCommentsWithUsernames] = useState<any>([])

    useEffect( () => {
      async function load() {
        const renderPromises = comments.map(async (comment: any) => {
          const userName = await getUsernameFromID(comment.commenterId);
          return <OneComment content={comment.content} userName={userName}/>
        });

        const renderedComments = await Promise.all(renderPromises);
        setCommentsWithUsernames(renderedComments)
      }

      load();
    }, [])

    if (commentsWithUsernames.length > 0) {
      return commentsWithUsernames
    } else {
      return <ActivityIndicator />
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})