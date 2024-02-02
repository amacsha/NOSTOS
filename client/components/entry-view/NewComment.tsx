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
import { addOneComment } from "../../slices/commentsSlice";

export default function NewComment({ route }: any) {
  const navigation = useNavigation();
  const entryId = useSelector(
    (state: RootState) => state.entries.selectedEntryID
  );
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useAppDispatch();

  async function handleSubmit(values: { content: string }) {
    if (values.content) {
      await postComment(entryId as number, userId as number, values.content);
      dispatch(
        addOneComment({
          commenterId: userId as number,
          content: values.content,
          entryId: entryId as number,
        })
      );
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
  },
  input: {
    // height: 400,
    borderWidth: 2,
    borderRadius: 15,
    margin: 5,
  },
});
