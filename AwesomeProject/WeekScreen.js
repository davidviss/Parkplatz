import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, ImageBackground } from 'react-native';
import {useState, useEffect} from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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
  const [user, setUser] = useState(null); // aktueller Benutzer

  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    // Listener für den Auth-Status des Benutzers
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Listener für die ausgewählten Tage des Benutzers
    if (!user) return;
  
    const db = getDatabase();
    const userDaysRef = ref(db, `users/${user.uid}/selectedDays`);
  
    onValue(userDaysRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSelectedDays(data);
      }
    });
  
    return () => {
      // clean up function
      if (userDaysRef) {
        userDaysRef.off('value');
      }
    };
  }, [user]);

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

  // Aktualisiert die ausgewählten Tage und speichert sie in Firebase Realtime Database
  const handleDayPress = (day) => {
    let newSelectedDays;
    if (selectedDays.includes(day)) {
      newSelectedDays = selectedDays.filter((d) => d !== day);
    } else {
      newSelectedDays = [...selectedDays, day];
    }
  
    setSelectedDays(newSelectedDays);
  
    if (user) {
      // Speichert die ausgewählten Tage des Benutzers in der Firebase-Datenbank
      const db = getDatabase();
      const userDaysRef = ref(db, `users/${user.uid}/selectedDays`);
      set(userDaysRef, newSelectedDays);
    }
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
        <View style={styles.daysContainer}>
          {['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'].map((day) => (
            <TouchableOpacity
              key={day}
              style={[styles.button, selectedDays.includes(day) && styles.selectedDayButton]}
              onPress={() => handleDayPress(day)}
            >
              <Text style={[styles.buttonText, selectedDays.includes(day) && styles.selectedDayButtonText]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
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
  daysContainer: {
  flexDirection: 'column', // Buttons sollen in Zeilen angeordnet sein
  justifyContent: 'space-around',
  marginBottom: 16,
  },
  button: {
  backgroundColor: 'grey',
  padding: 10,
  borderRadius: 10,
  marginVertical: 10,
  },
  buttonText: {
  fontSize: 20,
  color: '#fff',
  },
  selectedDayButton: {
  backgroundColor: 'green',
  },
  selectedDayButtonText: {
  color: '#fff',
  },
  });
export default ParkplatzAuswahl;