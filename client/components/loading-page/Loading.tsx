import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import GeoLocation from '../dashboard/GeoLocation';


SplashScreen.preventAutoHideAsync();

const LoadingPage = ({ navigation }: any) => {
    const [appIsReady, setAppIsReady] = useState<boolean>(false);
    const fetchLocation = GeoLocation();
    const asyncFetchLocation = async () => {
        await fetchLocation()
    }

    useEffect(() => {
        async function prepare() {
            try {
                // await new Promise(resolve => setTimeout(resolve, 2000))
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
            await asyncFetchLocation()
            await SplashScreen.hideAsync()
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
            <ActivityIndicator size="large" color='45417B' />
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