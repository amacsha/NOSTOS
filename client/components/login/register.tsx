import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Formik, useFormik } from "formik";
import * as Yup from 'yup';
import registerService from "./registerService";
import { RegisterValues } from "../../client-types/RegisterValues";
import { useAppDispatch } from '../../hooks';
import { setAuth, initialState } from '../../slices/authSlice';
import { save } from "../../utils/secureStorage";


const Register: React.FC = () => {
  const validationSchema = Yup.object().shape({
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
    const res: any = await registerService(values)
    // console.log('axios res', res)
    if (res.message) {
      // console.log('registration error', res.message)
      Alert.alert(`${res.message}`);
      dispatch(setAuth(initialState));
    } else {
      dispatch(setAuth({ isAuthenticated: true, token: res.data }))
      save('accessToken', res.data);
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
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry={true}
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <Button title="Register" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  head: {},
  input: {},
  error: {}
})

export default Register;