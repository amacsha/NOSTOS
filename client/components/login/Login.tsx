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
import React from 'react'


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
      Alert.alert('login 👍')
      dispatch(setAuth({ isAuthenticated: true, token: res.data.accessToken }))
      dispatch(updateUserDetails({
        id: res.data.userId, email: res.data.email, username: res.data.username
      }))
      save('accessToken', res.data.accessToken);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Login</Text>
      <Formik
        initialValues={{ email: 'L@l', password: 'aaaaaa' }}
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
            <Pressable style={styles.button} onPress={(event: GestureResponderEvent) => handleSubmit()}>
              <Text style={styles.buttonText} >Login</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.buttonText}>Register</Text>
            </Pressable>
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
    color: '#D4D5D6'
  },
  head: {},
  input: {
    backgroundColor: '#19222A',
    color: '#D4D5D6',
    marginVertical: 2,
    marginHorizontal: 10,
    height: 30,
    fontSize: 17,
  },
  error: {
    backgroundColor: '#341717',
    color: '#DD7272',
    marginVertical: 2,
    marginHorizontal: 10,
    height: 30,
    fontSize: 17,
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
  },
  buttonText: {
    color: '#9578F8',
    fontSize: 17,
  }
})

export default Login;