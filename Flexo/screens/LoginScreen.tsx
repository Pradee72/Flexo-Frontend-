import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constant/Colors';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { FIREBASE_AUTH } from '../configurations/firebaseConfigurations';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { addUser } from '../service/ApiCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;
export const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '82964876950-6gindb1fhs0jta6qe620g446ch9g4a42.apps.googleusercontent.com',
    });
    // Check if the user is already signed in
    const checkUserSignIn = async () => {
      const userInfo = await GoogleSignin.getCurrentUser();
      if (userInfo) {
        console.log('User is already signed in:', userInfo.user);
        await AsyncStorage.setItem('userDetails', JSON.stringify(userInfo.user));
        navigation.navigate('HomeScreen');
      }
    };
    checkUserSignIn();
  }, []);

  // Function to handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const signInResult = await GoogleSignin.signIn();
      const idToken = signInResult.data?.idToken;
      if (!idToken) {
        throw new Error('No ID token found');
      }
      const googleCredential = GoogleAuthProvider.credential(idToken);
      console.log('Google Credential:', googleCredential);
      const userCredential = await signInWithCredential(
        FIREBASE_AUTH,
        googleCredential,
      );
      console.log('User Credential:', userCredential.user);
      const data = {
        id: userCredential.user.uid,
        email: userCredential.user.email,
      };
      addUser(data);
      await AsyncStorage.setItem('userDetails', JSON.stringify(userCredential.user));
      navigation.navigate('HomeScreen');
    } catch (e) {
      console.log('error' + e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* <Image
          source={require('../assets/images/handshake.png')}
          style={styles.image}
        /> */}
        <Text style={{ color: Colors.text, fontSize: 30, fontWeight: 900 }}>
          Flexo
        </Text>
      </View>
      <View style={styles.googleView}>
        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleText} onPress={handleGoogleSignIn}>
            Google Signin
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    height: '80%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '40%',
    width: '40%',
    resizeMode: 'contain',
  },
  googleView: {
    height: '20%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {
    backgroundColor: Colors.secondary,
    height: '25%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 30,
  },
  googleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
});
