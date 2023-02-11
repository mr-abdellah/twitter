import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import RegisterFunction from "../utils/register";
import LoginFunction from "../utils/login";
import toastAlert from "../utils/Notification";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addTweets } from "../redux/slices/tweets";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const signup = async (email, password) => {
    setIsLoading(true);
    const id = toast.loading("Creating your account is pending");
    await RegisterFunction(email, password)
      .then((user) => {
        localStorage.setItem(
          "twitterAbdellahToken",
          user?._tokenResponse.refreshToken
        );
        setUserToken(user?._tokenResponse.refreshToken);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.update(id, {
          render: `Error while creating your account : ${error.message}`,
          type: "error",
          isLoading: false,
        });
      })
      .finally(() => {
        toast.update(id, {
          render: "You have created your account successfully 👌",
          type: "success",
          isLoading: false,
          autoClose: true,
        });
      });
  };

  const login = async (email, password) => {
    setIsLoading(true);
    const id = toast.loading("login into your account is pending");
    await LoginFunction(email, password)
      .then((user) => {
        localStorage.setItem(
          "twitterAbdellahToken",
          user?._tokenResponse.refreshToken
        );
        setUserToken(user?._tokenResponse.refreshToken);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.update(id, {
          render: `Error while login to your account : ${error.message}`,
          type: "error",
          isLoading: false,
          autoClose: true,
          closeOnClick: true,
        });
      })
      .finally(() => {
        toast.update(id, {
          render: "You are logged in successfully 👌",
          type: "success",
          isLoading: false,
          autoClose: true,
          closeOnClick: true,
        });
      });
  };

  const logout = () => {
    const id = toast.loading("logout");
    signOut(auth)
      .then(() => {
        setIsLoading(true);
        setUserToken(null);
        localStorage.removeItem("twitterAbdellahToken");
        setIsLoading(false);
      })
      .catch((error) => {
        alert("Error while logout", error.message);
      })
      .finally(() => {
        toast.update(id, {
          render: "You are logged out successfully",
          type: "success",
          isLoading: false,
          autoClose: true,
          closeOnClick: true,
        });
      });
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      setUserToken(localStorage.getItem("twitterAbdellahToken"));
      setIsLoading(false);
    } catch (error) {
      console.log("error while checking if user is logged in", error.message);
    }
  };

  const getUserCollection = async () => {
    try {
      if (auth.currentUser.uid) {
        const q = query(
          collection(db, "users"),
          where("id", "==", auth.currentUser.uid)
        );

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setUser({ ...data, referenceId: doc.id });
          //
        });
      }
    } catch (error) {
      console.log("error while getting user collection", error.message);
    }
  };

  const getAllTweets = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tweets"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), referenceId: doc.id });
      });
      dispatch(addTweets(data));
      // console.log("test", data.length);
    } catch (error) {}
  };

  const updateUserCollection = async (arg) => {
    try {
      await updateDoc(doc(db, "users", user?.referenceId), {
        ...user,
        ...arg,
      });
      await getUserCollection();
    } catch (error) {}
  };

  useEffect(() => {
    getUserCollection();
  }, [userToken]);

  useEffect(() => {
    isLoggedIn();
  }, [user]);

  useEffect(() => {
    getAllTweets();
  }, []);

  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
      setIsLoading(true);
      if (user) {
        getUserCollection();
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return unsubscribeFromAuthStateChanged();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        signup,
        user,
        isLoading,
        userToken,
        updateUserCollection,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
