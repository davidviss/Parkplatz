import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage,ImageBackground } from 'react-native';

const getNextFridayNoon = () => {
  const now = new Date();
  const friday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (5 - now.getDay()) % 7 , 11, 0, 0);
  if (friday <= now) {
    friday.setDate(friday.getDate() + 7);
  }
  return friday;
};

const COUNTDOWN_TARGET = getNextFridayNoon(); // Nächstes Freitag mittag

const ParkplatzAuswahl = () => {
  const [countdown, setCountdown] = useState(0); // Countdown in Sekunden
  const [selectedDays, setSelectedDays] = useState([]); // ausgewählte Tage

    // Lädt die ausgewählten Tage aus AsyncStorage beim Starten der App
    useEffect(() => {
      AsyncStorage.getItem('selectedDays').then((data) => {
        if (data) {
          setSelectedDays(JSON.parse(data));
        }
      });
    }, []);

  // Aktualisiert den Countdown in Sekunden
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const difference = COUNTDOWN_TARGET - now;
      const seconds = Math.floor(difference / 1000);
      setCountdown(seconds);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

// Aktualisiert die ausgewählten Tage und speichert sie in AsyncStorage
const handleDayPress = (day) => {
  if (selectedDays.includes(day)) {
    setSelectedDays(selectedDays.filter((d) => d !== day));
  } else {
    setSelectedDays([...selectedDays, day]);
  }
  AsyncStorage.setItem('selectedDays', JSON.stringify(selectedDays));
};

return (
  <ImageBackground source={require('./bg.jpg')} style={styles.bg}>
    <View style={styles.container}>
      <Text style={styles.title}>Parkplatz-Verlosung</Text>
      <Text style={styles.countdown}>
        {countdown > 0 ? `${Math.floor(countdown / 86400)}:${Math.floor((countdown%86400) / 3600)}:${Math.floor(
          (countdown % 3600) / 60
        )}:${countdown % 60}` : 'Countdown beendet'}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Montag"
          onPress={() => handleDayPress('Montag')}
          color={selectedDays.includes('Montag') ? 'green' : 'gray'}
        />
        <Button
          title="Dienstag"
          onPress={() => handleDayPress('Dienstag')}
          color={selectedDays.includes('Dienstag') ? 'green' : 'gray'}
        />
        <Button
          title="Mittwoch"
          onPress={() => handleDayPress('Mittwoch')}
          color={selectedDays.includes('Mittwoch') ? 'green' : 'gray'}
        />
        <Button
          title="Donnerstag"
          onPress={() => handleDayPress('Donnerstag')}
          color={selectedDays.includes('Donnerstag') ? 'green' : 'gray'}
        />
        <Button
          title="Freitag"
          onPress={() => handleDayPress('Freitag')}
          color={selectedDays.includes('Freitag') ? 'green' : 'gray'}
        />
      </View>
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
  alignItems: 'center',
  justifyContent: 'center',
},
title: {
  fontSize: 40,
  fontWeight: 'bold',
  marginBottom: 16,
  color: '#768A99',
},
countdown: {
  fontSize: 48,
  marginBottom: 16,
  fontWeight: 'bold',
  color: '#768A99',
},
buttonContainer: {
  flexDirection: 'column', // Buttons sollen in Spalten angeordnet sein
  justifyContent: 'space-around',
  marginBottom: 16,
},
dayButton: {
  width: 200, // Breite des Buttons erhöhen
  height: 50,
  borderRadius: 25,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  marginBottom: 10, // Abstand zwischen Buttons erhöhen
},
dayButtonText: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#768A99',
},
selectedDayButton: {
  backgroundColor: '#8BC34A',
  color: '#fff',
},
selectedDayButtonText: {
  color: '#fff',
},
});

  
export default ParkplatzAuswahl;