// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDTQswqPtzG6cZFEiNXRlJ983QjFcVAz6o",
    authDomain: "portfolio-89383.firebaseapp.com",
    projectId: "portfolio-89383",
    storageBucket: "portfolio-89383.appspot.com",
    messagingSenderId: "558205635702",
    appId: "1:558205635702:web:0eac07a015de22bd2fa357"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default {
    auth: firebase.auth,
    firestore: firebase.firestore,
    firebase: firebase
}