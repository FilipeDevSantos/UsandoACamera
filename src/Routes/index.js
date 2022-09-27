import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '../pages/HomePage';
import CameraPage from '../pages/CameraPage';

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Home'
            >
                <Stack.Screen
                    name='Home'
                    component={HomePage}
                    options={{
                        title: 'Welcome to your camera app',
                        headerTitleStyle: {
                            color: '#fff'
                        },
                        headerStyle: {
                            backgroundColor: '#26a69a'
                        }
                    }}
                />
                <Stack.Screen
                    name='Camera'
                    component={CameraPage}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}