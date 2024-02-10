import React from 'react';
import { Alert, Pressable, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { useAppDispatch } from '../../hooks';
import { setAuth, initialState } from '../../slices/authSlice';
import { deleteItemAsync } from 'expo-secure-store';
import { updateUserDetails, initialState as userInitials, logout as LG } from '../../slices/userSlice';


const Logout: React.FC = () => {

    const dispatch = useAppDispatch();

    async function logout() {
        await Promise.all([
            deleteItemAsync('accessToken'),
            deleteItemAsync('userId'),
            deleteItemAsync('email'),
            deleteItemAsync('username'),
            deleteItemAsync('filter_preference'),
        ])
        dispatch(setAuth(initialState));
        dispatch(LG())
        dispatch(updateUserDetails(userInitials))
    }

    return (
        <TouchableHighlight style={styles.button} underlayColor="#322F58" onPress={logout}>
            <Text style={styles.buttonText}>Logout</Text>
        </TouchableHighlight>
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
        width: 200,
        fontFamily: 'Gruppe_A',
    },
    buttonText: {
        color: '#9578F8',
        fontSize: 17,
        fontFamily: 'Gruppe_A',
    }
})

export default Logout;
