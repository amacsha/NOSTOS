import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserStart from "./components/login/UserStart";
import store from "./store";
import { Provider } from "react-redux";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Main from "./components/dashboard/Main";

export default function App() {
  return (
    <Provider store={store}>
      <UserStart/>
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
});
