import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Mission from '../mission/Mission';
import Main from '../dashboard/Main';
import UserProfile from '../dashboard/UserProfile';
import Home from '../Home/Home';
import GlobeView from '../dashboard/GlobeView';
import NewEntryForm from '../new-entry/NewEntryForm';
import { colors } from '../styles/colors';

const Tab = createBottomTabNavigator();

export default function Navbar() {

    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false,
            tabBarActiveBackgroundColor: colors.basePurple}}
        >
            <Tab.Screen name="Logs" component={Main} />
            <Tab.Screen name="GlobeView" component={GlobeView} />
            <Tab.Screen name="Mission" component={Mission} />
            <Tab.Screen name="UserProfile" component={UserProfile} />
        </Tab.Navigator>
    );
}