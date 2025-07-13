import { initializeApp } from 'firebase/app';
import * as firebase from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const reactNativePersistence = (firebase as any).getReactNativePersistence;

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBVWLt-Ir2-AOs3L7odNmvK973dk95iB2M",
  authDomain: "flexo-d48b7.firebaseapp.com",
  projectId: "flexo-d48b7",
  storageBucket: "flexo-d48b7.firebasestorage.app",
  messagingSenderId: "82964876950",
  appId: "1:82964876950:web:67fa282f03438ec20b3cb7",
  measurementId: "G-X2Z0XS8S02"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = (firebase as any).initializeAuth(FIREBASE_APP, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage)
});