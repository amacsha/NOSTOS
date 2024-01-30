import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import loginService from "./loginService";
import { LoginValues } from "../../client-types/LoginValues";
import { useAppDispatch } from '../../hooks';
import { setAuth, initialState } from '../../slices/authSlice';
import { save } from "../../utils/secureStorage";
import LogoutService from "./logoutService";


const Login: React.FC = () => {
  const [loginForm, setLoginForm] = useState<LoginValues>({ email: "", password: "" })
  const [error, setError] = useState<LoginValues>({ email: "", password: "" })

  const dispatch = useAppDispatch();

  const handleChange = (name: keyof typeof loginForm, value: string) => {
    setLoginForm({ ...loginForm, [name]: value })
  }

  const handleSubmit = async () => {
    let newError: LoginValues = { ...error }
    !loginForm.email ? newError.email = "email is required" : newError.email = "";
    !loginForm.password ? newError.password = "Password is required" : newError.password = "";
    setError(newError)

    if (Object.values(newError).every(err => err === "")) {
      const res: any = await loginService(loginForm)
      if (res.error) {
        Alert.alert(`${res.error}`);
        dispatch(setAuth(initialState));
      } else {
        Alert.alert('login 👍')
        dispatch(setAuth({ isAuthenticated: true, token: res.data }))
        save('accessToken', res.data);
      }
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.head}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          onChange={(event) => handleChange("email", event.nativeEvent.text)}
        />
        {error.email !== "" && <Text style={styles.error}>{error.email}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChange={(event) => handleChange("password", event.nativeEvent.text)}
        />
        {error.password !== "" && <Text style={styles.error}>{error.password}</Text>}
        <Button title="Login" onPress={handleSubmit} />
      </View>
      <LogoutService />
    </>
  )
}

const styles = StyleSheet.create({
  container: {},
  head: {},
  input: {},
  error: {}
})

export default Login;