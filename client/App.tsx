import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/login/login';
import Register from './components/login/register';
import store from './store';
import Main from './components/dashboard/Main';
import { Provider } from 'react-redux';
import { getValueFor } from './utils/secureStorage';

const Stack = createNativeStackNavigator();

export default function App() {
  // const isSignedIn = getValueFor('accessToken') = true;
  const isSignedIn = false;

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {isSignedIn ? (
            <>
              <Stack.Screen name="register" component={Register} />
            </>
          ) : (
            <>
              <Stack.Screen name="login" component={Login} />
            </>
          )}
        </Stack.Navigator>
        {/* <Main /> */}

      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
