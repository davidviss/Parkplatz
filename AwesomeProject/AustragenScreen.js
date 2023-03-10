import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const AustragenScreen = () => {
  const daysOfWeek = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

  return (
    <View style={styles.container}>
      {daysOfWeek.map((day) => (
        <TouchableOpacity key={day} style={styles.button}>
          <Text style={styles.buttonText}>{day}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#8BC34A',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default AustragenScreen;
