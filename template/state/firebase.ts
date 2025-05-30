// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_SECRET_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_SECRET_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_SECRET_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_SECRET_FIREBASE_STOREAGE_BUCKET,
    messagingSenderId: process.env.NEXT_SECRET_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_SECRET_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_SECRET_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import 'firebase/auth';
// import { getAuth } from 'firebase/auth';
//
// const firebaseConfig = {
//     apiKey: 'YOUR_API_KEY',
//     authDomain: 'YOUR_AUTH_DOMAIN',
//     projectId: 'YOUR_PROJECT_ID',
//     storageBucket: 'YOUR_STORAGE_BUCKET',
//     messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//     appId: 'YOUR_APP_ID',
// };
//
// const app = initializeApp(firebaseConfig);
//
// const db = getFirestore(app);
// const auth = getAuth(app);
//
// export { db, auth };
