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
import { useAppDispatch } from "../../hooks";
import { commentsSlice } from "../../slices/commentsSlice";
import { setComments } from "../../slices/commentsSlice";

const EntryView: React.FC = ({ navigation }: any) => {
  const id = useSelector((state: RootState) => state.entries.selectedEntryID);
  const userId = useSelector((state: RootState) => state.user.id);
  const comments = useSelector((state: RootState) => state.comments);

  const dispatch = useAppDispatch();

  // TODO change to redux
  const [entryDetails, setEntryDetails] = useState<any>(undefined);
  let usersExistingComment: string | undefined = "";

  async function load() {
    const update = await getOneEntry(id as number);
    const commentsFromAPI: [] = await getComments(id as number);
    console.log(commentsFromAPI)
    dispatch(setComments(commentsFromAPI))
    setEntryDetails(update);
  }

  useEffect(() => {
    load();
  }, []);

  if (!entryDetails) return <ActivityIndicator />;
  // if (comments.length > 0) {
  //   usersExistingComment = comments.find(
  //     (comment) => comment.commenterId === userId
  //   )?.content;
  // }

  if (comments.length > 0) console.log(comments)
  if (comments.some(comment => comment.entryId === id)) {
    usersExistingComment = comments.find(comment => {
      comment.commenterId === userId && comment.entryId === id
    })?.content

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
                defaultContent: usersExistingComment
              })
            }
          />
        ) : (
          <Button
            title="NEW COMMENT"
            onPress={() => navigation.navigate("New Comment")}
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
    color: 'white',
    fontFamily: 'Gruppe_A', 
  },
  commentContainer: {
    borderWidth: 2,
    margin: 5,
    maxHeight: 350,
    fontFamily: 'Gruppe_A', 
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    margin: 15,
    fontFamily: 'Gruppe_A', 
  },
  content: {
    fontSize: 18,
    margin: 35,
    fontFamily: 'Gruppe_A', 
  },
  ratings: {},
});

export default EntryView;
