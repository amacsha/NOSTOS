import React from 'react';
import { Alert, Button, GestureResponderEvent, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { Formik } from "formik";
import * as Yup from 'yup';
import RegisterService from "../../service/RegisterService";
import { RegisterValues } from "../../client-types/RegisterValues";
import { useAppDispatch } from '../../hooks';
import { setAuth, initialState } from "../../slices/authSlice";
import { updateUserDetails } from "../../slices/userSlice";
import { save } from "../../utils/secureStorage";
import { UserResponse } from "../../client-types/UserResponse";
import { colors } from '../styles/colors';




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
    <SafeAreaView style={styles.container}>
      <View style={styles.inputArea}>
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
                placeholderTextColor={colors.lighterPurple}
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
                placeholderTextColor={colors.lighterPurple}
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
                placeholderTextColor={colors.lighterPurple}
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkGre7,
    height: '100%',
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

export default Register;