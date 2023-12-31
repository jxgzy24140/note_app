// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
(async () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDXGsctnxC7AVGYg40AWMCEkdSAJ9AeqPc",
    authDomain: "note-app-33372.firebaseapp.com",
    projectId: "note-app-33372",
    storageBucket: "note-app-33372.appspot.com",
    messagingSenderId: "258516953572",
    appId: "1:258516953572:web:e63239263b5d47cbcdfff1",
    measurementId: "G-MNY8XGVB82",
  };

  // Initialize Firebase
  const app = await initializeApp(firebaseConfig);
  getAnalytics(app);
})();
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
