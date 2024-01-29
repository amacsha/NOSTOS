import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import registerService from "./registerService";
import { RegisterValues } from "../../client-types/RegisterValues";


const Register: React.FC = () => {
  const [registerForm, setRegisterForm] = useState<RegisterValues>({ username: '', email: '', password: '' })
  const [error, setError] = useState<RegisterValues>({ username: '', email: '', password: '' })

  const handleChange = (name: keyof typeof registerForm, value: string) => {
    setRegisterForm({ ...registerForm, [name]: value })
  }

  const handleSubmit = () => {
    let newError: RegisterValues = { ...error }
    !registerForm.username ? newError.username = 'Username is required' : newError.username = '';
    !registerForm.email ? newError.email = 'Email is required' : newError.email = '';
    !registerForm.password ? newError.password = 'Password is required' :
      registerForm.password.length < 6 ? newError.password = 'Password must be at least 6 characters' : newError.password = '';

    setError(newError)
    if (Object.values(newError).every(err => err === '')) {
      registerService(registerForm);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.head}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder='Username'
          onChange={(event) => handleChange('username', event.nativeEvent.text)}
        />
        {error.username !== '' && <Text style={styles.error}>{error.username}</Text>}
        <TextInput
          style={styles.input}
          placeholder='Email'
          onChange={(event) => handleChange('email', event.nativeEvent.text)}
        />
        {error.email !== '' && <Text style={styles.error}>{error.email}</Text>}
        <TextInput
          style={styles.input}
          placeholder='Password'
          onChange={(event) => handleChange('password', event.nativeEvent.text)}
        />
        {error.password !== '' && <Text style={styles.error}>{error.password}</Text>}
        <Button title="Register" onPress={handleSubmit} />
      </View>
    </>
  )

}

const styles = StyleSheet.create({
  container: {},
  head: {},
  input: {},
  error: {}
})

export default Register;