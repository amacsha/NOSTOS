import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  ActivityIndicator,
  TouchableHighlight,
  StyleSheet,
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
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from "moment";
import { Entry } from "../../client-types/Entry";
import { Comment } from "../../client-types/Comment";

const EntryView: React.FC = ({ navigation }: any) => {
  const id = useSelector((state: RootState) => state.entries.selectedEntryID);
  const user = useSelector((state: RootState) => state.user)
  const comments = useSelector((state: RootState) => state.comments);
  const dispatch = useAppDispatch();

  // TODO change to redux
  const [entryDetails, setEntryDetails] = useState<Entry | undefined>(undefined);
  let usersExistingComment: string | undefined = "";

  async function load() {
    const update: Entry = await getOneEntry(id as number);
    const commentsFromAPI: Comment[] = await getComments(id as number);
    dispatch(setComments(commentsFromAPI));
    setEntryDetails(update);
  }

  useEffect(() => {
    load();
  }, []);

  if (!entryDetails) return <ActivityIndicator />;
  if (comments.length > 0) {
    usersExistingComment = comments.find(
      (comment) => comment.commenterId === user.id
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
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView style={styles.contentContainer}>
          <View>
            <Text style={styles.title}>{entryDetails.title}</Text>
            <Text style={styles.title}>By {user.username}, {moment(entryDetails.creation_date).fromNow()}</Text>
          </View>

          <View>
            <Text style={styles.content}><Typewriter text={entryDetails.content} delay={5} /></Text>
          </View>
        </ScrollView>

        <View style={styles.commentContainer}>
          <View style={styles.ratingContainer}>
            <UserRating userId={user.id} entryId={id} />
          </View>

          <CommentView></CommentView>
          <View style={styles.addCommentButtonContainer}>
            {addCommentButton}
          </View>
        </View>
      </SafeAreaView>
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
  },
  ratingContainer: {

  },
  commentContainer: {
    flex: 0.75,
  },
  title: {
    fontSize: 28,
    margin: 15,
    fontFamily: "Gruppe_A",
  },
  content: {
    fontSize: 16,
    lineHeight: 30,
    margin: 35,
    fontFamily: "Gruppe_A",
  },
  addCommentButtonContainer: {
    alignItems: "center",
  },
  addCommentButton: {
    borderWidth: 2,
    borderRadius: 0,
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
