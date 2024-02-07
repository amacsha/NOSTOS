import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Pressable,
} from "react-native";
import { postComment } from "./EntryService";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../hooks";
import { setComments } from "../../slices/commentsSlice";
import { Comment } from "../../client-types/Comment";
import { getValueFor } from "../../utils/secureStorage";
import { colors } from "../styles/colors";

export default function NewComment({ route }: any) {
  const token: string = getValueFor("accessToken") || "";

  const [newMsg, setNewMsg] = useState("")

  useEffect(() => {
    route.params?.defaultContent
    && setNewMsg(route.params.defaultContent)
  }, [route])

  const navigation = useNavigation();

  const entryId = useSelector(
    (state: RootState) => state.entries.selectedEntryID
  );
  const userId = useSelector((state: RootState) => state.user.id);
  const comments = useSelector((state: RootState) => state.comments);

  const dispatch = useAppDispatch();

  async function handleSubmit() {
    if (newMsg.length) {
      let newState;
      await postComment(
        entryId as number,
        userId as number,
        newMsg,
        token
      );

      let commentExists = comments.some(
        (comment) =>
          comment.commenterId === userId && comment.entryId === entryId
      );
      let newObject: Comment = {
        commenterId: userId as number,
        content: newMsg,
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
      navigation.goBack();
    } else {
      Alert.alert('Message can\'t be empty')
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>Write a comment</Text>
          <TextInput 
            placeholder="speak your mind..." 
            multiline 
            style={styles.textInput} 
            defaultValue={newMsg} 
            onChangeText={setNewMsg}
            autoFocus={true}
          />
          <View style={styles.btnContainer}>
            <Pressable
              style={styles.button}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>CANCEL</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>SAVE</Text>
            </Pressable>
            </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighterPurple
  },
  inner: {
    padding: 30,
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 25,
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    fontFamily: "Gruppe_A",
  },
  textInput: {
    color: 'white',
    fontFamily: 'Gruppe_A',
    flex: 1,
    textAlignVertical: 'top',
    padding: 10
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    backgroundColor: '#45417B',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 15,
    padding: 5,
    height: 30,
    width: 150,
    fontFamily: 'Gruppe_A',
  },
  buttonText: {
    color: '#9578F8',
    fontSize: 17,
    fontFamily: 'Gruppe_A',
  },
});
