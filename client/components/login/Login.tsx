import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert, Button, GestureResponderEvent, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { Formik } from "formik";
import * as Yup from 'yup';
import LoginService from "../../service/LoginService";
import { useAppDispatch } from '../../hooks';
import { setAuth, initialState } from '../../slices/authSlice';
import { updateUserDetails } from "../../slices/userSlice";
import { save } from "../../utils/secureStorage";
import { LoginValues } from "../../client-types/LoginValues";
import { UserResponse } from "../../client-types/UserResponse";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { TouchableHighlight } from "react-native";
import { colors } from "../styles/colors";
import confirmDBIsConnected from "../../service/DBConnectedService";

type LoginProps = {
  navigation: NativeStackNavigationProp<any>
}

const Login: React.FC<LoginProps> = ({ navigation }) => {

  const validationSchema = Yup.object<LoginValues>().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
  })

  const dispatch = useAppDispatch();

  const handleSubmit = async (values: LoginValues) => {
    try {
      await confirmDBIsConnected();
      const res: UserResponse = await LoginService(values)
      if (res.error) {
        Alert.alert(`${res.error}`);
        dispatch(setAuth(initialState));
      } else {
        dispatch(updateUserDetails({ id: res.data.userId, email: res.data.email, username: res.data.username }));
        dispatch(setAuth({ isAuthenticated: true, token: res.data.accessToken }))
        save('accessToken', res.data.accessToken);
        save('userId', res.data.userId.toString());
        save('email', res.data.email);
        save('username', res.data.username);
        save('filter_preference', res.data.filter_preference);
      }

    } catch (error) {
      Alert.alert('Cannot connect to server.')
      console.log(error)
    }
  }

  const user = useSelector(
    (state: RootState) => state.user.filter_preference
  )


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputArea}>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={values => handleSubmit(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={colors.lighterPurple}
                onChangeText={handleChange("email")}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={colors.lighterPurple}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={true}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
              <TouchableHighlight style={styles.button} underlayColor="#322F58" onPress={() => handleSubmit()}>
                <Text style={styles.buttonText} >Login</Text>
              </TouchableHighlight>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.basePurple,
    fontFamily: 'Gruppe_A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  credentialContainer: {
    backgroundColor: colors.darkGrey,
    height: '50%',
    fontFamily: 'Gruppe_A',
  },
  head: {
    fontSize: 20,
    color: colors.gunMetalGrey,
    fontFamily: 'Gruppe_A',
  },
  inputArea: {
    backgroundColor: colors.basePurple,
    paddingTop: 20,
    paddingBottom: 5,
    width: '90%',
  },
  input: {
    backgroundColor: colors.gunMetalGrey,
    color: colors.darkGrey,
    marginVertical: 5,
    marginHorizontal: 25,
    paddingLeft: 5,
    height: 50,
    fontSize: 20,
    fontFamily: 'Gruppe_A',
  },
  error: {
    backgroundColor: colors.errorBackground,
    color: colors.errorFont,
    marginVertical: 2,
    marginHorizontal: 25,
    paddingTop: 5,
    paddingLeft: 5,
    height: 25,
    fontSize: 15,
    fontFamily: 'Gruppe_A',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: colors.basePurple,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    margin: 5,
    padding: 5,
    height: 40,
    width: 130,
    fontFamily: 'Gruppe_A',
  },
  buttonText: {
    color: colors.gunMetalGrey,
    fontSize: 20,
    fontFamily: 'Gruppe_A',
  }
})

export default Login;