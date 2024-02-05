import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Mission from '../mission/Mission';
import Main from '../dashboard/Main';
import UserProfile from '../dashboard/UserProfile';

const Tab = createBottomTabNavigator();

export default function Navbar() {

    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="Home" component={Main} />
            <Tab.Screen name="Logs" component={Main} />
            <Tab.Screen name="Mission" component={Mission} />
            <Tab.Screen name="UserProfile" component={UserProfile} />
        </Tab.Navigator>
    );
}