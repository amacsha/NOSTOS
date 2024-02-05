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

    const res: UserResponse = await LoginService(values)
    // console.log(res)
    if (res.error) {
      Alert.alert(`${res.error}`);
      dispatch(setAuth(initialState));
    } else {
      // Alert.alert('login 👍')
      dispatch(setAuth({ isAuthenticated: true, token: res.data.accessToken }))
      save('accessToken', res.data.accessToken);
      save('userId', res.data.userId.toString());
      save('email', res.data.email);
      save('username', res.data.username);
      save('filter_preference', res.data.filter_preference);
    }
  }

  const user = useSelector(
    (state: RootState) => state.user.filter_preference
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputArea}>
        <Text style={styles.head}>Login</Text>
        <Formik
          initialValues={{ email: 'admin@nostos.com', password: 'adminadmin' }}
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
              <TouchableHighlight style={styles.button} underlayColor="#322F58" onPress={() => navigation.navigate('Register')}>
                <Text style={styles.buttonText}>Register</Text>
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
    backgroundColor: colors.darkGre7,
    height: '100%',
    fontFamily: 'Gruppe_A',
  },
  head: {
    fontSize: 20,
    color: colors.gunMetalGrey,
    fontFamily: 'Gruppe_A',
    marginHorizontal: 25,
  },
  inputArea: {
    marginTop: 200
  },
  input: {
    backgroundColor: colors.gunMetalGrey,
    color: colors.darkGre7,
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