import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  ImageBackground,
  Alert,
  BackHandler
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

// Funktion für den nächsten Freitagmittag
const getNextFridayNoon = () => {
  const now = new Date();
  const friday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (5 - now.getDay()) % 7 , 11, 0, 0);
  if (friday <= now) {
    friday.setDate(friday.getDate() + 7);
  }
  return friday;
};


const HomeScreen = () => {
  // state variables to store the login form values
  const navigation = useNavigation();

  // animation value for the login button
  const buttonAnimation = new Animated.Value(1);

  // function to animate the login button on press
  const animateButton = () => {
    Animated.timing(buttonAnimation, {
      toValue: 0.8,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handlePress = () => {
    navigation.navigate('Countdown');
    // animate the login button
    animateButton();
  };
  const handlePressResult = () => {
    navigation.navigate("Übersicht");
    animateButton();
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    Alert.alert(
      'Verlassen',
      'Möchten Sie die App wirklich verlassen?',
      [
        {
          text: 'Abbrechen',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'Verlassen', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
    return true;
  };
  

  const [currentWeek, setCurrentWeek] = useState(0);
  const [nextWeek, setNextWeek] = useState(0);

  useEffect(() => {
    const date = new Date();
    setCurrentWeek(date.getWeek());

    const nextFridayNoon = getNextFridayNoon();
    const nextFridayWeek = nextFridayNoon.getWeek();
    setNextWeek(nextFridayWeek);
  }, []);



  return (
    <ImageBackground source={require('./bg.jpg')} style={styles.bg}>
      <View style={styles.container}>
        <Text style={styles.title}>Ergebnis</Text>
        <TouchableOpacity style={styles.button} onPress={handlePressResult}>
          <Animated.View
            style={[
              styles.animatedButton,
              {transform: [{scale: buttonAnimation}]},
            ]}>
            <Text style={styles.buttonText}>Kalenderwoche: {currentWeek} </Text>
          </Animated.View>
        </TouchableOpacity>
        <Text style={styles.title}>Freigeben/Eintragen</Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Animated.View
            style={[
              styles.animatedButton,
              {transform: [{scale: buttonAnimation}]},
            ]}>
            <Text style={styles.buttonText}>Freigeben/Bewerben
            </Text>
          </Animated.View>
        </TouchableOpacity>
        <Text style={styles.title}>Verlosung</Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Animated.View
            style={[
              styles.animatedButton,
              {transform: [{scale: buttonAnimation}]},
            ]}>
            <Text style={styles.buttonText}>Kalenderwoche: {nextWeek}
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#768A99',
    marginBottom: 24,
  },
  button: {
    width: '90%',
    height: 96,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    opacity: 0.5,
    marginBottom: 24,
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '400',
  },
  buttonSubText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '400',
  },
});

Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}

export default HomeScreen;
