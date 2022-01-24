import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAewloLFjfZjrSKf7DGQ9Nu4IPA9ShxDk0",
  authDomain: "nwitter4.firebaseapp.com",
  projectId: "nwitter4",
  storageBucket: "nwitter4.appspot.com",
  messagingSenderId: "664505659658",
  appId: "1:664505659658:web:7349a04bf2eff320108af3",
};

export default firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
