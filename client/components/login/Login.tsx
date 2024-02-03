import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert, Button, GestureResponderEvent, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
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
    <View style={styles.container}>
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
              placeholderTextColor='#876FE4'
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
              placeholderTextColor='#876FE4'
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
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#081116',
    height: '100%',
    color: '#D4D5D6',
    fontFamily: 'Gruppe_A',
  },
  head: {},
  input: {
    backgroundColor: '#19222A',
    color: '#D4D5D6',
    marginVertical: 2,
    marginHorizontal: 10,
    height: 30,
    fontSize: 17,
    fontFamily: 'Gruppe_A',
  },
  error: {
    backgroundColor: '#341717',
    color: '#DD7272',
    marginVertical: 2,
    marginHorizontal: 10,
    height: 30,
    fontSize: 17,
    fontFamily: 'Gruppe_A',
  },
  button: {
    backgroundColor: '#45417B',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 3,
    padding: 3,
    height: 30,
    width: 80,
    fontFamily: 'Gruppe_A',
  },
  buttonText: {
    color: '#9578F8',
    fontSize: 17,
    fontFamily: 'Gruppe_A',
  }
})

export default Login;