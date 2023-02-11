import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

const register = async (email, password) => {
  const user = await createUserWithEmailAndPassword(auth, email, password);

  const currentUser = await user.user;
  const docRef = await addDoc(collection(db, "users"), {
    id: currentUser.uid,
    email: currentUser.email,
    displayName: currentUser.displayName,
    bio: null,
    profileCategory: null,
    username: null,
    location: null,
    coverImage: null,
    profileImage: currentUser.photoURL,
    website: null,
    followers: 0,
    following: 0,
    likedTweets: [],
  });
  return user;
};
export default register;
