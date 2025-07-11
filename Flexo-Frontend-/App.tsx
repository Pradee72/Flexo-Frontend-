/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import AppNavigation from './navigation/AppNavigation';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <AppNavigation/>
  );
}


export default App;
