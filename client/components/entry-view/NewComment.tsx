import { Formik } from "formik";
import * as yup from "yup";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Alert,
  GestureResponderEvent,
  SafeAreaView,
  Pressable,
} from "react-native";
import { postComment } from "./EntryService";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../hooks";
import { setComments } from "../../slices/commentsSlice";
import { Comment } from "../../client-types/Comment";
import { getValueFor } from "../../utils/secureStorage";
import { colors } from "../styles/colors";

export default function NewComment({ route }: any) {
  const token: string = getValueFor("accessToken") || "";

  const navigation = useNavigation();
  const entryId = useSelector(
    (state: RootState) => state.entries.selectedEntryID
  );
  const userId = useSelector((state: RootState) => state.user.id);
  const comments = useSelector((state: RootState) => state.comments);

  const dispatch = useAppDispatch();

  async function handleSubmit(values: { content: string }) {
    if (values.content) {
      let newState;
      await postComment(
        entryId as number,
        userId as number,
        values.content,
        token
      );

      let commentExists = comments.some(
        (comment) =>
          comment.commenterId === userId && comment.entryId === entryId
      );
      let newObject: Comment = {
        commenterId: userId as number,
        content: values.content,
        entryId: entryId as number,
      };

      if (commentExists) {
        const commentIndex = comments.findIndex(
          (comment) =>
            comment.commenterId === userId && comment.entryId === entryId
        );
        newState = comments
          .slice(0, commentIndex)
          .concat([newObject])
          .concat(comments.slice(commentIndex + 1));
      } else {
        newState = comments.slice().concat([newObject]);
      }

      dispatch(setComments(newState));
    }

    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.formikContainer}>
        <Formik
          initialValues={
            route.params?.defaultContent
              ? { content: route.params.defaultContent }
              : { content: "" }
          }
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ handleChange, handleSubmit, values }) => (
            <>
              <TextInput
                multiline
                autoFocus
                placeholder="Speak your mind..."
                style={styles.textInput}
                value={values.content}
                onChangeText={handleChange("content")}
              ></TextInput>

              <View style={styles.addCommentButtonContainer}>
                <Pressable
                  style={styles.addCommentButton}
                  onPress={(event: GestureResponderEvent) => handleSubmit()}
                >
                  <Text style={styles.addCommentButtonText}>SAVE</Text>
                </Pressable>

                <Pressable
                  style={styles.addCommentButton}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={styles.addCommentButtonText}>CANCEL</Text>
                </Pressable>
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.lighterPurple,
  },
  formikContainer: {},
  textInput: {
    // borderWidth: 2,
    height: 400, // NOT IDEAL!!
    margin: 25,
    fontFamily: "Gruppe_A",
    fontSize: 25,
  },
  addCommentButtonContainer: {
    gap: 5,
    alignItems: "center",
  },
  addCommentButton: {
    width: 125,
    alignItems: "center",
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
