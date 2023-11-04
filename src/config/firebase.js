import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';



const firebaseConfig = {
    apiKey: "AIzaSyBheuPRpNzSOji8BE8LpfmcDYPo5j48d_A",
    authDomain: "repository-exercises.firebaseapp.com",
    projectId: "repository-exercises",
    storageBucket: "repository-exercises.appspot.com",
    messagingSenderId: "36138964769",
    appId: "1:36138964769:web:02b53900ea0f07a5309060"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);

export {auth};
export {storage};
export default db;
