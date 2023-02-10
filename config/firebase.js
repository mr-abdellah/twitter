import { getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";

function initializeAppIfNecessary() {
  try {
    return getApp();
  } catch (any) {
    const firebaseConfig = {
      apiKey: "AIzaSyAr4JylNcGY_5qbP36zziaAvPcdpUcGZA4",
      authDomain: "twitter-clone-1caa1.firebaseapp.com",
      databaseURL: "https://twitter-clone-1caa1-default-rtdb.firebaseio.com",
      projectId: "twitter-clone-1caa1",
      storageBucket: "twitter-clone-1caa1.appspot.com",
      messagingSenderId: "494109309203",
      appId: "1:494109309203:web:d423b96d433bfddedd42e6",
    };
    return initializeApp(firebaseConfig);
  }
}

const app = initializeAppIfNecessary();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();

export { auth, db, storage };
