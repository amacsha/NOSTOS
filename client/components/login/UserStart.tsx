import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirstEntry from "./FirstEntry"
import Login from "./Login";
import Register from "../register/Register";
import Main from "../dashboard/Main";
import Mission from "../mission/Mission";
import { NavigationContainer } from "@react-navigation/native";
import Location from "../dashboard/Location";
import EntryView from "../entry-view/EntryView";
import NewEntryForm from "../new-entry/NewEntryForm";
import NewComment from "../entry-view/NewComment";
import { getValueFor } from "../../utils/secureStorage";
import Logout from "../logout/Logout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { initialState, setAuth } from "../../slices/authSlice";
import { updateUserDetails } from "../../slices/userSlice";
import LoadingPage from "../loading-page/Loading";
import Navbar from "../navbar/Navbar";
import GlobeView from "../dashboard/GlobeView";

const Stack = createNativeStackNavigator();

export default function UserStart() {
  const dispatch = useDispatch();

  const loadUserDetails = async () => {
    let token = await getValueFor('accessToken');
    let userId = Number(await getValueFor('userId'));
    let email = await getValueFor('email');
    let username = await getValueFor('username');
    if (token) {
      dispatch(setAuth({ isAuthenticated: true, token: token }));
      dispatch(updateUserDetails({ id: userId, email: email, username: username }));
    }
  };
  loadUserDetails()

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen name="LoadingPage" component={LoadingPage} />
            <Stack.Screen name="GlobeView" component={GlobeView} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Navbar" component={Navbar} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Logs" component={Main} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Mission" component={Mission} />
            <Stack.Screen name="Location" component={Location} />
            <Stack.Screen name="EntryView" component={EntryView} />
            <Stack.Screen name="New Comment" component={NewComment} />
            <Stack.Screen name="NewEntryForm" component={NewEntryForm} />
            <Stack.Screen name="Logout" component={Logout} />
          </>
        ) : (
          <>
            <Stack.Screen name="FirstEntry" component={FirstEntry} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>

  );
}
