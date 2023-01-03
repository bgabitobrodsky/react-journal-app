import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyCVo8t9S6pMQuk_RsYCcg11y9LGRNOp5lo",
  authDomain: "react-cursos-f56bb.firebaseapp.com",
  projectId: "react-cursos-f56bb",
  storageBucket: "react-cursos-f56bb.appspot.com",
  messagingSenderId: "878854175444",
  appId: "1:878854175444:web:47c82b9b0d6709abce9941"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);