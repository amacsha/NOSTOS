import { Animated } from "react-native";

export const glitchAnimation = new Animated.Value(0);

export const startGlitch = () => {
    Animated.loop(
        Animated.sequence([
            Animated.timing(glitchAnimation, { toValue: 5, duration: 50, useNativeDriver: true }),
            Animated.timing(glitchAnimation, { toValue: -5, duration: 50, useNativeDriver: true }),
            Animated.timing(glitchAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
            Animated.delay(1000)
        ]),
    ).start();
}