import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseconfig = {
    apiKey: "AIzaSyB8vanORTDVYG6Fgt0z44OtyGwYiIdop9w",
    authDomain: "fir-login-a1735.firebaseapp.com",
    projectId: "fir-login-a1735",
    storageBucket: "fir-login-a1735.appspot.com",
    messagingSenderId: "1057904145381",
    appId: "1:1057904145381:web:c5a288b18f2ede1ecf350c",
    measurementId: "G-TVZE1XD59H"



};

export const myFirebase = firebase.initializeApp(firebaseconfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;