// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import firebaseConfigData from './firebase-config.js'

const firebaseConfig = firebaseConfigData;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default {
    auth: firebase.auth,
    firestore: firebase.firestore,
    firebase: firebase
}