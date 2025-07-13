import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { StorageDisplayScreen } from '../screens/SotrageDisplayScreen';

export type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  HomeScreen: undefined;
  StorageDisplayScreen: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
