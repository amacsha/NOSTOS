import React from "react";
import { StyleSheet } from "react-native";
import UserStart from "./components/login/UserStart";
import store from "./store";
import { Provider } from "react-redux";

import Comment from "./components/entry-view/Comment";

export default function App() {
  return (
    <Provider store={store}>
      {/* <Comment /> */}
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
});
