import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  ActivityIndicator,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { getOneEntry, getComments } from "./EntryService";
import { useSelector } from "react-redux";
import UserRating from "./UserRating";
import CommentView from "./CommentView";
import { RootState } from "../../store";
import NewComment from "./NewComment";


const EntryView: React.FC = ({ navigation }: any) => {
  const id = useSelector((state: RootState) => state.entries.selectedEntryID);
  const userId = useSelector((state: RootState) => state.user.id);

  const [entryDetails, setEntryDetails] = useState<any>(undefined);
  const [comments, setComments] = useState<any[]>([]);

  let usersExistingComment: string = "";

  async function load() {
    const update = await getOneEntry(id as number);
    const comments: [] = await getComments(id as number);
    setComments(comments);
    setEntryDetails(update);
  }

  useEffect(() => {
    load();
  }, []);

  if (!entryDetails) return <ActivityIndicator />;
  if (comments.length > 0) {
    usersExistingComment = comments.find(
      (comment) => comment.commenterId === userId
    )?.content;
  }

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{entryDetails.data.title}</Text>
        </View>

        <View>
          <Text style={styles.content}>{entryDetails.data.content}</Text>
        </View>

        <View style={styles.ratings}>
          <UserRating userId={userId} entryId={id} />
        </View>
      </View>
      <View style={styles.commentContainer}>
        {usersExistingComment ? (
          <Button
            title="EDIT COMMENT"
            onPress={() =>
              navigation.navigate("New Comment", {
                defaultContent: usersExistingComment,
                load
              })
            }
          />
        ) : (
          <Button
            title="NEW COMMENT"
            onPress={() => navigation.navigate("New Comment", {load})}
          />
        )}
        {comments.length === 0 ? <Text>No comments!</Text> :
        <CommentView comments={comments} /> }
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    margin: 5,
  },
  commentContainer: {
    borderWidth: 2,
    margin: 5,
    maxHeight: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    margin: 15,
  },
  content: {
    fontSize: 18,
    margin: 35,
  },
  ratings: {},
});

export default EntryView;
