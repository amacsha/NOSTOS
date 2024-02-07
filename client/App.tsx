import React, { useCallback, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import UserStart from "./components/login/UserStart";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import store from "./store";
import { Provider } from "react-redux";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  SplashScreen.preventAutoHideAsync();

  const [fontLoaded, fontError] = useFonts({
    Gruppe_A: require("./assets/fonts/Gruppe_A.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontLoaded, fontError]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <UserStart />
      </SafeAreaProvider>
    </Provider>
  );
}