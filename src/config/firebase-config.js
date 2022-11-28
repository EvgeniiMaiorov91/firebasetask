// import firebase from 'firebase';
import {
    initializeApp
} from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyAPLgHuusRGQx9U9_Lm62NRdEvNqDM26Ao",
    authDomain: "fir-task-b98a9.firebaseapp.com",
    projectId: "fir-task-b98a9",
    storageBucket: "fir-task-b98a9.appspot.com",
    messagingSenderId: "963514352253",
    appId: "1:963514352253:web:5eda54d3ac5c73828fe714"
};

// export const fb = firebase.initializeApp(firebaseConfig)
export const fb = initializeApp(firebaseConfig);

