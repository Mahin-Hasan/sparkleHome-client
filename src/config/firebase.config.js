import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyClXxU4WTxdBRCnTL2ce6i72PBTCwFGMOE",
    authDomain: "simple-firebase-c5197.firebaseapp.com",
    projectId: "simple-firebase-c5197",
    storageBucket: "simple-firebase-c5197.appspot.com",
    messagingSenderId: "493798521877",
    appId: "1:493798521877:web:87a40de440ca526423221c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);