import React from "react";
import { StyleSheet, useCallback } from "react-native";
import UserStart from "./components/login/UserStart";
import { useFonts } from 'expo-font'
import store from "./store";
import { Provider } from "react-redux";

export default function App() {

  const [fontLoaded, fontError] = useFonts({
    'Gruppe_A': require('./assets/fonts/Gruppe_A.ttf'),
  })

  

  return (
    <Provider store={store}>
      <UserStart />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: '100%',
    height: '100%'
  },
});
