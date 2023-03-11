import React, {useState, useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
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
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  // state variables to store the login form values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
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

  // function to handle the login process
  const handleLogin = () => {
    const auth = getAuth();
    const trimmedUsername = username.trim();
    signInWithEmailAndPassword(auth, trimmedUsername, password)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        navigation.navigate('Home');
      })
      .catch((error) => {
        // Handle errors
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('Error', 'Invalid username or password');
      });
    // animate the login button
    animateButton();
  };

  function handleForgotPassword(event) {
    event.preventDefault()
    Alert.alert(
      '',
      'Are you sure you want to reset your password?',  
      [
         {text: 'Ja', onPress: () => 
         {const auth = getAuth()
          const email = username.trim();
          sendPasswordResetEmail(auth, email)
            .then(() => {
              alert("Password reset email sent.")
            })
            .catch((error) => {
              console.error(error)
              alert(error.message)
            })},
             style: 'cancel'
        },
         {text: 'Abbrechen', onPress: () => console.log('Abbrechen pressed')},
      ],
      { cancelable: false }
 )
    
  }

  useFocusEffect(
    React.useCallback(() => {
      // Clear the password state when the screen comes into focus
      setPassword('');
      if (rememberPassword) {
        // retrieve the password from local storage and set it to the password state
        // you can implement this using AsyncStorage or some other storage mechanism
      }
      return () => {};
    }, [rememberPassword])
  );

  return (
    <ImageBackground source={require('./bg.jpg')} style={styles.bg}>
      <View style={styles.container}>
        <Text style={styles.title}>Parkplatzlotterie</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={text => setUsername(text)}
          placeholder="Email"
          borderRadius={20}
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Password"
          secureTextEntry
          borderRadius={20}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Animated.View
            style={[
              styles.animatedButton,
              {transform: [{scale: buttonAnimation}]},
            ]}>
            <Text style={styles.buttonText}>Log In</Text>
          </Animated.View>
        </TouchableOpacity>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={rememberPassword}
            onValueChange={(value) => setRememberPassword(value)}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Remember me</Text>
          <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
            <Text style={styles.label}>Forgot Password?</Text>
          </TouchableOpacity>
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
    marginTop: 4,
    
  },
  checkbox: {
    alignSelf: "center",
  },
  forgotPassword: {
    flexDirection: "row",
    alignItems: 'center',
    marginLeft: 30,
  },
  forgotPasswordText: {
    color: '#A8CCCB',
    fontSize: 16,
  },
});

export default LoginScreen;
