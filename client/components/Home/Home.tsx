import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated, Dimensions } from "react-native";

const Home = () => {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 20000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <View style={styles.container}>
            <Animated.Image
                style={{ ...styles.globe, transform: [{ rotateY: spin }] }}
                source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg" }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    globe: {
        width: 300,
        height: 300,
        borderRadius: 150,
        resizeMode: "cover",
    },
});

export default Home;