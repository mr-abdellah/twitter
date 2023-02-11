import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  orderBy,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import RegisterFunction from "../utils/register";
import LoginFunction from "../utils/login";
import toastAlert from "../utils/Notification";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addTweets } from "../redux/slices/tweets";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const { tweets } = useSelector((state) => state.tweets);

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
        setUser(null);
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
      return true;
    } catch (error) {
      console.log("error while checking if user is logged in", error.message);
      return false;
    }
  };

  const getUserCollection = async () => {
    if (auth?.currentUser?.uid) {
      try {
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
      } catch (error) {
        console.log("error while getting user collection", error.message);
      }
    }
  };

  const getAllTweets = async () => {
    try {
      const q = query(collection(db, "tweets"), orderBy("created_at", "desc"));

      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), referenceId: doc.id });
      });
      dispatch(addTweets(data));
      // console.log("test", data.length);
    } catch (error) {
      console.log("error while getting tweets", error.message);
    }
  };

  const updateUserCollection = async (arg) => {
    console.log("updating user : ", user);
    try {
      const id = toast.loading("Updating...");
      await updateDoc(doc(db, "users", user?.referenceId), {
        ...user,
        ...arg,
      });
      toast.update(id, {
        render: "You have updated your account successfully",
        type: "success",
        isLoading: false,
        autoClose: true,
        closeOnClick: true,
      });
      await getUserCollection();
    } catch (error) {
      console.log("error while updating user collection", error);
      toast.update(id, {
        render: `Error while updating your profile : ${error}`,
        type: "error",
        isLoading: false,
        autoClose: true,
        closeOnClick: true,
      });
    }
  };

  const likeTweet = async (referenceId, id, tweetID) => {
    getAllTweets();
    const tweet = tweets.find((item) => item?.referenceId === referenceId);

    const q = query(
      collection(db, "users"),
      where("id", "==", auth?.currentUser?.uid)
    );

    const querySnapshot = await getDocs(q);
    let userReferenceID;
    querySnapshot.forEach((doc) => {
      userReferenceID = doc.id;
      console.log("user reference", doc.id);
      //
    });
    const tweetReference = doc(db, "tweets", referenceId);
    const userReference = doc(db, "users", userReferenceID);

    try {
      const check = tweet?.likes?.includes(id);
      if (check) {
        await updateDoc(tweetReference, {
          likes: arrayRemove(id),
        })
          .then(() => {
            console.log("unliked");
            getAllTweets();
          })
          .catch((e) =>
            console.log("error while unliking tweet : ", e.message)
          );
        await updateDoc(userReference, {
          likedTweets: arrayRemove(tweetID),
        })
          .then(() => {
            console.log("removed tweet from user");
            getAllTweets();
          })
          .catch((e) =>
            console.log("error while removing tweet from user", e.message)
          );
      }
      if (!check) {
        await updateDoc(tweetReference, {
          likes: arrayUnion(id),
        })
          .then(() => {
            console.log("liked");
            getAllTweets();
          })
          .catch(() => console.log("error while liking tweet"));

        await updateDoc(userReference, {
          likedTweets: arrayUnion(tweetID),
        })
          .then(() => {
            console.log("added tweet to user");
          })
          .catch((error) =>
            console.log("error while adding tweet to user", error)
          );
      }
    } catch (error) {
      console.log("error in like functionality", error);
    }
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
        isLoggedIn,
        user,
        isLoading,
        userToken,
        updateUserCollection,
        getAllTweets,
        likeTweet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
