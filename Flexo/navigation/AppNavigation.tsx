import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { StorageDisplayScreen } from '../screens/SotrageDisplayScreen';
import { StorageMapScreen } from '../screens/StorageMapScreen';
import MenuScreen from '../screens/MenuScreen';

// ✅ Update types to include unit object passed to StorageMapScreen
export type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  HomeScreen: undefined;
  StorageDisplayScreen: undefined;
  StorageMapScreen: { unit: any }; // accepts unit object from storage display
  MenuScreen: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="SplashScreen"
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="StorageDisplayScreen" component={StorageDisplayScreen} />
        <Stack.Screen name="StorageMapScreen" component={StorageMapScreen} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
