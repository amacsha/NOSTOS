import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert, Button, GestureResponderEvent, StyleSheet, Text, TextInput, View } from "react-native";
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
            <Button title="Login" onPress={(event: GestureResponderEvent) => handleSubmit()} />
            <Button title="Register" onPress={() => navigation.navigate('Register')} />
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