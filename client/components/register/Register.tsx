import React from 'react';
import { Alert, Button, GestureResponderEvent, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Formik } from "formik";
import * as Yup from 'yup';
import RegisterService from "../../service/RegisterService";
import { RegisterValues } from "../../client-types/RegisterValues";
import { useAppDispatch } from '../../hooks';
import { setAuth, initialState } from "../../slices/authSlice";
import { updateUserDetails } from "../../slices/userSlice";
import { save } from "../../utils/secureStorage";
import { UserResponse } from "../../client-types/UserResponse";




const Register: React.FC = () => {

  const validationSchema = Yup.object<RegisterValues>().shape({
    username: Yup.string()
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })

  const dispatch = useAppDispatch();

  const handleSubmit = async (values: RegisterValues) => {

    const res: UserResponse = await RegisterService(values)
    if (res.error) {
      Alert.alert(`${res.message}`);
      dispatch(setAuth(initialState));
    } else {
      Alert.alert('user created 👍')
      dispatch(setAuth({ isAuthenticated: true, token: res.data.accessToken }))
      dispatch(updateUserDetails({
        id: res.data.userId,
        email: res.data.email,
        username: res.data.username,
        filter_preference: res.data.filter_preference
      }))
      save('accessToken', res.data.accessToken);
      save('userId', res.data.userId.toString());
      save('email', res.data.email);
      save('username', res.data.username);
      save('filter_preference', res.data.filter_preference);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Register</Text>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={values => handleSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder='Username'
              placeholderTextColor='#876FE4'
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {touched.username && errors.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder='Email'
              placeholderTextColor='#876FE4'
              onChangeText={handleChange('email')}
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
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry={true}
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <Pressable style={styles.button} onPress={(event: GestureResponderEvent) => handleSubmit()}>
              <Text style={styles.buttonText}>Register</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
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

export default Register;