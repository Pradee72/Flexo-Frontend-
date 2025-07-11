import { initializeApp } from 'firebase/app';
import * as firebase from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const reactNativePersistence = (firebase as any).getReactNativePersistence;

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAnQLvgth8hXxpAA_4dNLtQB394Q5Sig2U",
  authDomain: "bluepact-9f88b.firebaseapp.com",
  projectId: "bluepact-9f88b",
  storageBucket: "bluepact-9f88b.firebasestorage.app",
  messagingSenderId: "157179805161",
  appId: "1:157179805161:web:945860381b8e16a6769f78",
  measurementId: "G-KD8JM3DEP2"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = (firebase as any).initializeAuth(FIREBASE_APP, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage)
});