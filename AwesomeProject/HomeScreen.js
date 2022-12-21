import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  ImageBackground,
  Alert,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

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

  return (
    <ImageBackground source={require('./bg.jpg')} style={styles.bg}>
      <View style={styles.container}>
        <Text style={styles.title}>Lotterien</Text>
        <Text style={styles.title}>Aktueller Parkplatz</Text>
        <Text style={styles.title}>P7</Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Animated.View
            style={[
              styles.animatedButton,
              {transform: [{scale: buttonAnimation}]},
            ]}>
            <Text style={styles.buttonText}>Kalenderwoche 1</Text>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Animated.View
            style={[
              styles.animatedButton,
              {transform: [{scale: buttonAnimation}]},
            ]}>
            <Text style={styles.buttonText}>Kalenderwoche 2</Text>
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
});

export default HomeScreen;
