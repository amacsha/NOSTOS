import { Alert, Button, GestureResponderEvent, StyleSheet, Text, TextInput, View } from "react-native";
import { Formik } from "formik";
import * as Yup from 'yup';
import RegisterService from "../../service/RegisterService";
import { useAppDispatch } from '../../hooks';
import { setAuth, initialState } from '../../slices/authSlice';
import { updateUserDetails } from "../../slices/userSlice";
import { save } from "../../utils/secureStorage";
import { RegisterValues } from "../../client-types/RegisterValues";
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
    if (res.message) {
      Alert.alert(`${res.message}`);
      dispatch(setAuth(initialState));
    } else {
      Alert.alert('user created 👍')
      dispatch(setAuth({ isAuthenticated: true, token: res.data.accessToken }))
      dispatch(updateUserDetails({
        id: res.data.userId, email: res.data.email, username: res.data.username
      }))
      save('accessToken', res.data.accessToken);
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
            <Button title="Register" onPress={(event: GestureResponderEvent) => handleSubmit()} />
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