import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import handleUploadImage from "../UploadImage";
import { updateProfile } from "firebase/auth";
import { auth } from "../../config/firebase";

const handleUpdateProfile = async (
  updateUserCollection,
  user,
  image,
  cover,
  name,
  username,
  bio,
  location,
  website
) => {
  try {
    const profileImglink = await handleUploadImage(image);
    const coverImglink = await handleUploadImage(cover);
    await updateUserCollection({
      profileImage: profileImglink ? profileImglink : user?.profileImage,
      name: name ? name : user?.name,
      coverImage: coverImglink ? coverImglink : user?.coverImage,
      username: username ? username : user?.username,
      bio: bio ? bio : user?.bio,
      location: location ? location : user?.location,
      website: website ? website : user?.website,
    });
    await updateProfile(auth.currentUser, {
      name: auth.currentUser.name === name ? currentUser.name : name,
      photoURL: profileImglink,
    }).catch((error) =>
      console.log("error while updating auth profile", error)
    );
  } catch (error) {
    console.log("error while updating profile", error);
  }
};

export default handleUpdateProfile;
