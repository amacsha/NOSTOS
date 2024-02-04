import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  ActivityIndicator,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
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
import Typewriter from "../../utils/TypewriterLoading";
import { colors } from "../styles/colors";

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
    dispatch(setComments(commentsFromAPI));
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

  const addCommentButton = usersExistingComment ? (
    <Pressable
      style={styles.addCommentButton}
      onPress={() => {
        navigation.navigate("New Comment", {
          defaultContent: usersExistingComment,
        });
      }}
    >
      <Text style={styles.addCommentButtonText}>EDIT YOUR COMMENT</Text>
    </Pressable>
  ) : (
    <Pressable
      onPress={() => navigation.navigate("New Comment")}
      style={styles.addCommentButton}
    >
      <Text style={styles.addCommentButtonText}>ADD COMMENT</Text>
    </Pressable>
  );

  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView style={styles.contentContainer}>
          <View>
            <Text style={styles.title}>{entryDetails.data.title}</Text>
          </View>

          <View>
            <Typewriter text={entryDetails.data.content} delay={5} />
          </View>
        </ScrollView>

        <View style={styles.commentContainer}>
          <View style={styles.ratingContainer}>
            <UserRating userId={userId} entryId={id} />
          </View>

          <CommentView></CommentView>
          <View style={styles.addCommentButtonContainer}>
            {addCommentButton}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    fontFamily: "Gruppe_A",
    backgroundColor: colors.lighterPurple,
  },
  contentContainer: {
    flex: 1,
    // borderWidth: 3,
  },
  ratingContainer: {
    // borderWidth: 1,
  },
  commentContainer: {
    flex: 0.75,
    // borderWidth: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    margin: 15,
    fontFamily: "Gruppe_A",
  },
  content: {
    fontSize: 18,
    margin: 35,
    fontFamily: "Gruppe_A",
  },
  addCommentButtonContainer: {
    alignItems: "center",
  },
  addCommentButton: {
    borderWidth: 2,
    borderRadius: 15,
  },
  addCommentButtonText: {
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: "Gruppe_A",
    fontSize: 20,
  },
});

export default EntryView;
