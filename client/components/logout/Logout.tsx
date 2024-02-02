import React from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { useAppDispatch } from '../../hooks';
import { setAuth, initialState } from '../../slices/authSlice';
import { deleteItemAsync } from 'expo-secure-store';
import { updateUserDetails, initialState as userInitials } from '../../slices/userSlice';


const Logout: React.FC = () => {

    const dispatch = useAppDispatch();

    function logout() {
        deleteItemAsync('accessToken');
        deleteItemAsync('userId');
        deleteItemAsync('email');
        deleteItemAsync('username');
        deleteItemAsync('filter_preference');
        dispatch(setAuth(initialState));
        dispatch(updateUserDetails(userInitials))
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
        fontFamily: 'Gruppe_A', 
    },
    buttonText: {
        color: '#9578F8',
        fontSize: 17,
        fontFamily: 'Gruppe_A', 
    }
})

export default Logout;
