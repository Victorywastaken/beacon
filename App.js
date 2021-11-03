import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#008E8C' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: '#fff',
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='AddChat' component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

https://youtu.be/MJzmZ9qmdaE?t=7032
https://youtu.be/MJzmZ9qmdaE?t=7032
https://youtu.be/MJzmZ9qmdaE?t=7032
https://youtu.be/MJzmZ9qmdaE?t=7032
https://youtu.be/MJzmZ9qmdaE?t=7032
https://youtu.be/MJzmZ9qmdaE?t=7032
https://youtu.be/MJzmZ9qmdaE?t=7032
https://youtu.be/MJzmZ9qmdaE?t=7032

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
