import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import GeoLocation from '../dashboard/GeoLocation';
import { getValueFor } from '../../utils/secureStorage';
import { setAuth } from '../../slices/authSlice';
import { updateUserDetails } from '../../slices/userSlice';
import Typewriter from '../../utils/TypewriterLoading';


SplashScreen.preventAutoHideAsync();

const LoadingPage = ({ navigation }: any) => {
    const [appIsReady, setAppIsReady] = useState<boolean>(false);
    const fetchLocation = GeoLocation();
    const glitchAnimation = new Animated.Value(0);

    const startGlitch = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(glitchAnimation, { toValue: 5, duration: 50, useNativeDriver: true }),
                Animated.timing(glitchAnimation, { toValue: -5, duration: 50, useNativeDriver: true }),
                Animated.timing(glitchAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
                Animated.delay(1000)
            ]),
        ).start();
    }

    useEffect(() => {
        async function prepare() {
            try {
                startGlitch();
                await fetchLocation()
                await new Promise(resolve => setTimeout(resolve, 2000))
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
                <Typewriter text="NOSTOS" delay={1300} />
            </Animated.Text>
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
        color: '#26224F'
    }
});

export default LoadingPage;