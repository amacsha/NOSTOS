import React, { useEffect, useState } from "react";
import { Alert, Button, GestureResponderEvent, StyleSheet, Text, TextInput, View } from "react-native";
import { Formik, useFormik } from "formik";
import * as Yup from 'yup';
import { AxiosResponse } from "axios";
import loginService from "./loginService";
import { useAppDispatch } from '../../hooks';
import { setAuth, initialState } from '../../slices/authSlice';
import { save } from "../../utils/secureStorage";
import { LoginValues } from "../../client-types/LoginValues";
import { LoginResponse } from "../../client-types/LoginResponse";

const Login: React.FC = () => {

  const validationSchema = Yup.object<LoginValues>().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
  })

  const dispatch = useAppDispatch();

  const handleSubmit = async (values: LoginValues) => {
    const res: AxiosResponse<LoginResponse> = await loginService(values)
    if ('error' in res) {
      Alert.alert(`${res.error}`);
      dispatch(setAuth(initialState));
    } else {
      Alert.alert('login 👍')
      dispatch(setAuth({ isAuthenticated: true, token: res.data.token }))
      save('accessToken', res.data.token);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Login</Text>
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
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={true}
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <Button title="Login" onPress={() => handleSubmit()} />
          </>
        )}
      </Formik>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {},
  head: {},
  input: {},
  error: {}
})

export default Login;