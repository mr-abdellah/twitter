import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

const register = async (email, password) => {
  const user = await createUserWithEmailAndPassword(auth, email, password);
  console.log("its working");
  const currentUser = await user.user;
  const docRef = await addDoc(collection(db, "users"), {
    email: currentUser.email,
    id: currentUser.uid,
    displayName: currentUser.displayName,
    photoURL: currentUser.photoURL,
    profileDescription: null,
    profileCategory: null,
    username: null,
    location: null,
    coverImage: null,
    followers: 0,
    following: 0,
    likedTweets: [],
  });
  return user;
};
export default register;
