import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useAppDispatch } from '../../hooks';
import { setAuth, initialState } from '../../slices/authSlice';
import { save } from "../../utils/secureStorage";


const LogoutService: React.FC = () => {

    const dispatch = useAppDispatch();

    function logout() {
        dispatch(setAuth(initialState));
        save('accessToken', null);
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
