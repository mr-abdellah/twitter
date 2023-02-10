import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

const login = async (email, password) => {
  const user = await signInWithEmailAndPassword(auth, email, password);
  console.log("login is working", user);
  return user;
};

export default login;
