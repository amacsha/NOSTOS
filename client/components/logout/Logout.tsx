import React from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { useAppDispatch } from '../../hooks';
import { setAuth, initialState } from '../../slices/authSlice';
import { getValueFor, save } from "../../utils/secureStorage";
import { deleteItemAsync } from 'expo-secure-store';


const LogoutService: React.FC = () => {

    const dispatch = useAppDispatch();

    async function logout() {
        await deleteItemAsync('accessToken');
        dispatch(setAuth(initialState));
        // Alert.alert('token destroyed');
    }

    return (
        <Pressable style={styles.button} onPress={logout}>
            <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {},
    head: {},
    input: {},
    error: {},
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

export default LogoutService;
