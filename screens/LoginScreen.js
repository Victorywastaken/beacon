import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { StatusBar } from 'react-native'
import { auth } from '../firebase';

const LoginScreen = ( { navigation } ) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        navigation.replace('Home')
      }
    });

    return unsubscribe;
  }, [])

  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password)
      .catch(error => alert(error.message))
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>
      <Button
        containerStyle={styles.button}
        title="Login"
        onPress={signIn}
      />
      <Button
        containerStyle={styles.button}
        title="Register"
        type="outline"
        onPress={() => navigation.navigate('Register')}
      />
      <View style={{height: 100}} />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  }
});

export default LoginScreen;

