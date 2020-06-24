import React from 'react';
import 'react-native-gesture-handler';
import {
    Text
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import JoinScreen from './JoinScreen';

const HomeStack = createStackNavigator(
    {
        HomeScreen
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            title: 'Home',
        }),
    }
);
const SettingStack = createStackNavigator(
    {
        SettingScreen
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            title: 'Setting',
        }),
        initialRouteName: 'SettingScreen',
    }
);


const TabNavigator = createBottomTabNavigator(
    {
        Home: HomeStack,
        Setting: SettingStack,
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                let icon = "▲";

                if(routeName === 'Home'){
                    icon = "🌈";
                } else if(routeName === 'Setting'){
                    icon = "🌙"
                } 

                // can use react-native-vector-icons
                // <Icon name={iconName} size={iconSize} color={iconColor} />
                return <Text style={{color: focused && "#46c3ad" || "#888"}}>{icon}</Text>
            }
        }),
        lazy: false,
        tabBarOptions: {
            activeTintColor: "#46c3ad",
            inactiveTintColor: "#888",
        },
    }
);


const Join = createStackNavigator(
    {
        JoinScreen,

    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            title: 'Join',
        }),
        initialRouteName: 'JoinScreen',
    }
)

const AppStack = createStackNavigator(
    {
        LoginScreen: LoginScreen,
        TabNavigator: {
            screen: TabNavigator,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
        Join : {
            screen : Join,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
    }
);



export default createAppContainer(AppStack);