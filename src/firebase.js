import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyAyPb-3oAumoeS1hBhJLhFAQnsHj6X_ZI4",

    authDomain: "glptraining.firebaseapp.com",

    projectId: "glptraining",

    storageBucket: "glptraining.appspot.com",

    messagingSenderId: "93884412032",

    appId: "1:93884412032:web:b7032c5b275f395a18b665",

    measurementId: "G-HWWF0PMTWK"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export {
    auth,
    db,
};