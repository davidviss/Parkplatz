import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import {initializeApp} from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDdX2WfK-bwpvPJoOaU-_90wWZuiClXhns",
  appId: "1:974662845460:android:aeaf331b9436db166b1301",
  projectId: "parkplatz-8fcda",
  storageBucket: "parkplatz-8fcda.appspot.com",
  databaseURL: "https://parkplatz-8fcda-default-rtdb.europe-west1.firebaseio.com",
  authDomain: "parkplatz-8fcda.firebaseapp.com",
  senderId: 974662845460
}
firebase.initializeApp(firebaseConfig);

const App = () => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
);


export default App;
