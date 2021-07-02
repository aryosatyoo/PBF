import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseconfig = {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  apiKey: "AIzaSyDuS42IroZ0EMdWZGP4V6g7pZit5-XRUYM",
  authDomain: "jobsheet10-dfa4f.firebaseapp.com",
  databaseURL: "https://jobsheet10-dfa4f-default-rtdb.firebaseio.com",
  projectId: "jobsheet10-dfa4f",
  storageBucket: "jobsheet10-dfa4f.appspot.com",
  messagingSenderId: "79883852421",
  appId: "1:79883852421:web:7a953034023cee4d1927ec",
  measurementId: "G-LXE6P1VKMC"
};

export const myFirebase = firebase.initializeApp(firebaseconfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;

export default firebaseconfig;