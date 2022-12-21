import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  ImageBackground,
} from 'react-native';

const CountdownScreen = () => {
  // Declare a state variable for the countdown date
  const [countdownDate, setCountdownDate] = useState(
    new Date('2022-12-19T11:00:00'),
  );

  // Declare a state variable for the current time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Declare a state variable for the time remaining until the countdown date
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Use an effect hook to update the current time and time remaining every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setTimeRemaining({
        days: Math.floor((countdownDate - currentTime) / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          ((countdownDate - currentTime) / (1000 * 60 * 60)) % 24,
        ),
        minutes: Math.floor(((countdownDate - currentTime) / (1000 * 60)) % 60),
        seconds: Math.floor(((countdownDate - currentTime) / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTime, countdownDate]);

  // Function to handle pressing a box
  const handlePress = index => {
    // Use LayoutAnimation to smoothly animate the box being pressed
    LayoutAnimation.spring();

    // TODO: Add logic for handling the box press here
  };

  return (
    <ImageBackground source={require('./bg.jpg')} style={styles.bg}>
      <View style={styles.container}>
        <Text style={styles.title}>Countdown</Text>
        <Text style={styles.countdown}>
          {timeRemaining.days} days {timeRemaining.hours} hours{' '}
          {timeRemaining.minutes} minutes {timeRemaining.seconds} seconds
        </Text>
        <View style={styles.grid}>
          {[...Array(11)].map((_, index) => (
            <TouchableOpacity
              key={index}
              style={styles.box}
              onPress={() => handlePress(index)}>
              <Text style={styles.boxText}>{index + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  countdown: {
    fontSize: 24,
    marginBottom: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  box: {
    width: '25%',
    aspectRatio: 1,
    backgroundColor: '#80B6C4',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  boxText: {
    color: '#fff',
    fontSize: 24,
  },
});

export default CountdownScreen;
