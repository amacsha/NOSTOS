import React, { useCallback, useEffect, useState } from 'react';
import SplashScreen from 'expo-splash-screen';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';



const LoadingPage = ({ navigation }: any) => {
    const [appIsReady, setAppIsReady] = useState<boolean>(false);

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
                const loadLocation = useSelector(
                    (state: RootState) => state.auth.isAuthenticated
                );

                await new Promise(resolve => setTimeout(resolve, 2000))
            } catch (error) {
                console.log(error)
            } finally {
                setAppIsReady(true)
            }
        }
        prepare();
    }, [])

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
            navigation.navigate('Main')
        }
    }, [appIsReady]);


    if (!appIsReady) return null

    return (
        <View
            style={styles.container}
            onLayout={onLayoutRootView}
        >
            <Text style={styles.text}>NOSTOS</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#9772b2",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'Gruppe_A',
    }
});

export default LoadingPage;