import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/login/login';
import Register from './components/login/register';
import store from './store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();
const getIsSignedIn = () => true;

export default function App() {
  const isSignedIn = getIsSignedIn();

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
