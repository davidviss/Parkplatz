import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import WeekScreen from './WeekScreen';
import ResultScreen from './ResultScreen';
import AustragenScreen from './AustragenScreen'
/*
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, listUsers } from "firebase/auth";

// Initialize Firebase
const db = getDatabase();
const auth = getAuth();

// Retrieve all users from Firebase Authentication
listUsers(auth)
  .then((userRecords) => {
    // Loop through all user records
    userRecords.forEach((userRecord) => {
      const userId = userRecord.uid;
      const userEmail = userRecord.email;

      // Create a new child node for the user with the email and probability value set to 1
      const userDaysRef = ref(db, 'users/' + userId);
      set(userDaysRef, { email: userEmail, probability: 1 })
        .then(() => {
          console.log(`User with ID ${userId} added to the database`);
        })
        .catch((error) => {
          console.error(`Error adding user with ID ${userId} to the database:`, error);
        });
    });
  })
  .catch((error) => {
    console.error('Error listing users:', error);
  });
*/

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
