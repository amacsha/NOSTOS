import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import loginService from "./loginService";
import { LoginValues } from "../../client-types/LoginValues";
import { useAppDispatch } from '../../hooks';
import { setAuth, initialState } from '../../slices/authSlice';
import { save } from "../../utils/secureStorage";




const Login: React.FC = () => {
  const [loginForm, setLoginForm] = useState<LoginValues>({ username: "", password: "" })
  const [error, setError] = useState<LoginValues>({ username: "", password: "" })

  const dispatch = useAppDispatch();

  const handleChange = (name: keyof typeof loginForm, value: string) => {
    setLoginForm({ ...loginForm, [name]: value })
  }

  const handleSubmit = async () => {
    let newError: LoginValues = { ...error }
    !loginForm.username ? newError.username = "Username is required" : newError.username = "";
    !loginForm.password ? newError.password = "Password is required" : newError.password = "";
    setError(newError)

    if (Object.values(newError).every(err => err === "")) {
      const res: any = await loginService(loginForm)
      if (res.message) {
        Alert.alert(`${res.message}`);
        // console.log('login error', error)
        dispatch(setAuth(initialState));
      } else {
        dispatch(setAuth({ isAuthenticated: true, token: res.data }))
        save('accessToken', res.data);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="username"
        onChange={(event) => handleChange("username", event.nativeEvent.text)}
      />
      {error.username !== "" && <Text style={styles.error}>{error.username}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChange={(event) => handleChange("password", event.nativeEvent.text)}
      />
      {error.password !== "" && <Text style={styles.error}>{error.password}</Text>}
      <Button title="Login" onPress={handleSubmit} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  head: {},
  input: {},
  error: {}
})

export default Login;