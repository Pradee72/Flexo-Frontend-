import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { RootStackParamList } from '../navigation/AppNavigation';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors';
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LoginScreen'
>;
export const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 3000);

    return () => clearTimeout(splashTimeout);
  }, []);

  return (
    <View style={styles.container}>
        <Text style={styles.topText}>Flexo</Text>
        <Text>Store Smart. Book Fast. Go Freely.</Text>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topText: {
        fontSize: 30,
        fontWeight: 900,
        color: Colors.text,
    },
    bottomText: {
        fontSize: 15,
        fontWeight:400,
    }
});
