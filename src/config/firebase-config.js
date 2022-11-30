
import {
    initializeApp
} from "firebase/app";
import {
    getFirestore
} from "firebase/firestore";
import {
    getStorage
} from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAPLgHuusRGQx9U9_Lm62NRdEvNqDM26Ao",
    authDomain: "fir-task-b98a9.firebaseapp.com",
    projectId: "fir-task-b98a9",
    storageBucket: "fir-task-b98a9.appspot.com",
    messagingSenderId: "963514352253",
    appId: "1:963514352253:web:5eda54d3ac5c73828fe714"
};

// export const fb = firebase.initializeApp(firebaseConfig)
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
