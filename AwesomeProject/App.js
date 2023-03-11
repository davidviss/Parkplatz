import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator';
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCI72Iv1kBmwexDojFVwRXi_7ppJKrgXDM",
  authDomain: "parkplatz-8fcda.firebaseapp.com",
  databaseURL: "https://parkplatz-8fcda-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "parkplatz-8fcda",
  storageBucket: "parkplatz-8fcda.appspot.com",
  messagingSenderId: "974662845460",
  appId: "1:974662845460:web:c42c82addc9961266b1301",
  measurementId: "G-L1QH5E9S20"
};

// Initialize Firebase
const ap = initializeApp(firebaseConfig);
const analytics = getAnalytics(ap);

getApps().length === 0 ? initializeApp(firebaseConfig) : console.log("Initialized");

const App = () => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
);


export default App;
