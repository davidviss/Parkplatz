import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import WeekScreen from './WeekScreen';
import ResultScreen from './ResultScreen';
import AustragenScreen from './AustragenScreen'

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#90BDDE',
        opacity: 0.9,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bolt',
      },
    }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Übersicht" component={ResultScreen}/>
    <Stack.Screen name="Countdown" component={WeekScreen} />
    <Stack.Screen name="Austragen" component ={AustragenScreen}/>
  </Stack.Navigator>
);

export default AppNavigator;
