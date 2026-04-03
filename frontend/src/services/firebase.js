import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCwsgLvAqAsh4dm7bu9Mw4fn4dziRVbEOs",
  authDomain: "skillswap-85a6e.firebaseapp.com",
  projectId: "skillswap-85a6e",
  storageBucket: "skillswap-85a6e.firebasestorage.app",
  messagingSenderId: "590056274458",
  appId: "1:590056274458:web:2d0348850502f201706fa3",
  measurementId: "G-CXX373JQNP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;