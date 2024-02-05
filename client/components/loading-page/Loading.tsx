import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import GeoLocation from '../dashboard/GeoLocation';
import Typewriter from '../../utils/TypewriterLoading';
import { startGlitch, glitchAnimation } from '../../utils/animatedGlitch';
import { colors } from '../styles/colors';
import TypewriterReverse from '../../utils/TypewriterLoadingReverse';
import confirmDBIsConnected from '../../service/DBConnectedService';


SplashScreen.preventAutoHideAsync();

const LoadingPage = ({ navigation }: any) => {
    const [appIsReady, setAppIsReady] = useState<boolean>(false);
    const fetchLocation = GeoLocation();

    useEffect(() => {
        async function prepare() {
            try {
                startGlitch();
                await confirmDBIsConnected();
                await fetchLocation()
            } catch (error) {
                console.log(error)
            } finally {
                setAppIsReady(true)
                navigation.navigate('Main')
            }
        }
        prepare();
    }, [])

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync()
        }
    }, [appIsReady]);


    // if (!appIsReady) return null

    return (
        <View
            style={styles.container}
            onLayout={onLayoutRootView}
        >
            <Animated.Text
                style={{
                    ...styles.text,
                    transform: [{ translateX: glitchAnimation }]
                }}
            >
                <TypewriterReverse text="NOSTOS" delay={1300} />
            </Animated.Text>
            <ActivityIndicator size="large" color='45417B' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.basePurple,
        alignItems: "center",
        justifyContent: "center",

    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'Gruppe_A',
        color: colors.darkGrey,
    }
});

export default LoadingPage;