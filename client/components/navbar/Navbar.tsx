import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Mission from '../mission/Mission';
import Main from '../dashboard/Main';
import UserProfile from '../dashboard/UserProfile';
import Home from '../Home/Home';
import GlobeView from '../dashboard/GlobeView';
import NewEntryForm from '../new-entry/NewEntryForm';
import { colors } from '../styles/colors';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GlobeViewApp from '../dashboard/GlobeViewApp';


const Tab = createBottomTabNavigator();

export default function Navbar() {

    return (
        <Tab.Navigator
            backBehavior='none'
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.basePurple,
                tabBarActiveBackgroundColor: colors.darkGrey,
                tabBarInactiveBackgroundColor: colors.darkGrey,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: colors.darkGrey,
                    height: 90,
                    borderTopColor: colors.darkGrey,
                    shadowOpacity: 3,
                    shadowColor: colors.lighterPurple,
                    elevation: 15,
                },

            }}
        >
            <Tab.Screen name="Logs" component={Main}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="card-text-outline" size={25} color="white" />
                    ),
                }}
            />
            <Tab.Screen name="GlobeViewApp" component={GlobeViewApp}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="rocket" size={24} color="white" />
                    ),
                }}
            />
            <Tab.Screen name="Mission" component={Mission}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="earth" size={25} color="white" />
                    ),
                }}
            />
            <Tab.Screen name="UserProfile" component={UserProfile}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome6 name="user-astronaut" size={25} color={colors.gunMetalGrey} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}


