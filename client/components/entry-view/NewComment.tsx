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
} from "react-native";
import { postComment } from "./EntryService";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../hooks";
import { setComments } from "../../slices/commentsSlice";
import { Comment } from "../../client-types/Comment";

export default function NewComment({ route }: any) {
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
      await postComment(entryId as number, userId as number, values.content);

      let commentExists = comments.some(comment => comment.commenterId === userId && comment.entryId === entryId);
      let newObject: Comment = {
        commenterId: userId as number,
        content: values.content,
        entryId: entryId as number
      }

      if (commentExists) {
        const commentIndex = comments.findIndex(comment => comment.commenterId === userId && comment.entryId === entryId);
        newState = comments.slice(0, commentIndex).concat([newObject]).concat(comments.slice(commentIndex + 1));
      } else {
        newState = comments.slice().concat([newObject]);
      }

      dispatch(setComments(newState))
      }

      navigation.navigate("EntryView" as never);
    }

  return (
    <View>
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
              autoFocus
              placeholder="Speak your mind..."
              style={styles.textInput}
              value={values.content}
              onChangeText={handleChange("content")}
            ></TextInput>

            <Button
              title="Save"
              onPress={(event: GestureResponderEvent) => handleSubmit()}
            />
            <Button
              title="Cancel"
              onPress={() => navigation.navigate("EntryView" as never)}
            />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  inner: {},
  header: {},
  textInput: {},
  btnContainer: {},
  container: {
    borderTopWidth: 1,
    fontFamily: 'Gruppe_A', 
  },
  input: {
    // height: 400,
    borderWidth: 2,
    borderRadius: 15,
    margin: 5,
    fontFamily: 'Gruppe_A', 
  },
});
