import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

interface LoginValues {
    username: string;
    email: string;
    password: string;
}

const Register: React.FC<LoginValues> = () => {
    const [form, setForm] = useState<LoginValues>({ username: '', email: '', password: '' })
    const [error, setError] = useState<LoginValues>({ username: '', email: '', password: '' })

    const handleChange = (name: keyof typeof form, value: string) => {
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = () => {
        let newErrors: LoginValues = { ...error }
        !form.username ? newErrors.username = 'Username is required' : newErrors.username = '';
        !form.email ? newErrors.email = 'Email is required' : newErrors.email = '';
        !form.password ? newErrors.email = 'Password is required' :
            form.password.length < 6 ? newErrors.password = 'Password must be at least 6 characters' : newErrors.password = '';

        setError(newErrors)
        if (Object.values(newErrors).every(err => err === '')) {
            console.log('user registered')
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