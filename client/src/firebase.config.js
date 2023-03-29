// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVdCgWnLEUCAkNXYSm_j8dWPoXMDwvOpw",
  authDomain: "chatbot-otp-a0608.firebaseapp.com",
  projectId: "chatbot-otp-a0608",
  storageBucket: "chatbot-otp-a0608.appspot.com",
  messagingSenderId: "697149979257",
  appId: "1:697149979257:web:98bd940e3f785bdc3132a8",
  measurementId: "G-H7N2KMBRHL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app)


