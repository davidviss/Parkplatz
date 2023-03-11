import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleRegister = () => {
    if (email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const auth = getAuth();
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email.trim(), password.trim())
      .then((userCredential) => {
        setIsLoading(false);
        Alert.alert('Success', 'Your account has been created successfully.');
        navigation.goBack();
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('Error', errorMessage);
      });
  };

  return (
    <ImageBackground source={require('./bg.jpg')} style={styles.bg}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          borderRadius={20}
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          autoCompleteType="password"
          textContentType="password"
          borderRadius={20}
        />
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          placeholder="Confirm Password"
          secureTextEntry
          autoCapitalize="none"
          autoCompleteType="password"
          textContentType="password"
          borderRadius={20}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={isLoading}>
          <Text style={styles.buttonText}>{isLoading ? 'Loading...' : 'Register'}</Text>
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
  input: {
    width: '90%',
    height: 48,
    borderWidth: 0,
    borderColor: '#ddd',
    paddingHorizontal: 16,
    fontSize: 18,
    marginBottom: 16,
    backgroundColor: '#fff',
    opacity: 0.5,
  },
  button: {
    width: '90%',
    height: 48,
    backgroundColor: '#A8CCCB',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    opacity: 0.9,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    alignSelf: "center",
  },
});

export default RegisterScreen;