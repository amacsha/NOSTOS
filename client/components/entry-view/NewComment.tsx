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

export default function NewComment({ navigation }: any) {

  const entryId = useSelector((state: RootState) => state.entries.selectedEntryID);
  const userId = useSelector((state: RootState) => state.user.id);

  //GET USER ID AND ENTRY ID FROM STATE

  async function handleSubmit(values: {content: string}) {
    // API Call
    console.log(entryId, userId, values.content)
    // await postComment(entryId as number, userId as number, values.content)

    navigation.navigate("EntryView");
  }

  return (
    <View>
      <Formik
        initialValues={{ content: "" }}
        onSubmit={values => handleSubmit(values)}
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

            <Button title="Save" onPress={(event: GestureResponderEvent) => handleSubmit()}/>
            <Button title="Cancel" onPress={() => navigation.navigate('EntryView')}/>
          </>
        )}
      </Formik>
    </View>
  );

  // return (
  //   <>
  //   <View style={styles.container}>
  //     <Formik initialValues={{comment: '', entryId: 0}} onSubmit={values => handleSubmit(values)}/>

  //     <TextInput placeholder="Have your say.." style={styles.input} autoFocus/>
  //   </View>

  //   <View>
  //     <Button title="Save" onPress={handleSubmit}/>
  //     <Button title="Cancel" onPress={() => navigation.navigate('EntryView')}/>
  //   </View>

  //   </>

  // )
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
