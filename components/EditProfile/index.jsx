import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  ArrowPathIcon,
  ArrowLeftIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Avatar, Button, TextField } from "@mui/material";
import handleUpdateProfile from "../../utils/UpdateProfile";
import handleSelectImage from "../../utils/ImagePicker";
import handleUploadImage from "../../utils/UploadImage";
import { auth } from "../../config/firebase";
import { updateProfile } from "firebase/auth";
const index = () => {
  const { user, updateUserCollection } = useContext(AuthContext);
  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const [name, setName] = useState(null);

  const [username, setUsername] = useState(null);

  const [bio, setBio] = useState(null);

  const [location, setLocation] = useState(null);

  const [website, setWebsite] = useState(null);

  const update = async (
    profileImage,
    coverImage,
    name,
    username,
    bio,
    location,
    website
  ) => {
    try {
      const profileImglink = profileImage
        ? await handleUploadImage(profileImage)
        : null;
      const coverImglink = coverImage
        ? await handleUploadImage(coverImage)
        : null;

      console.log("profile img link", profileImglink);
      await updateUserCollection({
        profileImage: profileImglink,
        name: name ? name : null,
        coverImage: coverImglink,
        username: username ? username : null,
        bio: bio ? bio : null,
        location: location ? location : null,
        website: website ? website : null,
      });
      await updateProfile(auth.currentUser, {
        name: auth.currentUser.name === name ? user.name : name,
        photoURL: profileImglink,
      }).catch((error) =>
        console.log("error while updating auth profile", error)
      );
    } catch (error) {
      console.log("error while updating profile", error);
    }
  };
  console.log(user);
  return (
    <div className="col-span-7 lg:col-span-5 lg:border-x relative">
      <div className="sticky flex items-center justify-between h-10 overflow-hidden text-ellipsis mt-2 mx-3">
        <Link href="/" className="h-4  md:h-8 md:w-8 cursor-pointer">
          <ArrowLeftIcon className="w-full h-full" />
        </Link>
        <h1 className="text-lg md:text-xl font-bold whitespace-nowrap text-ellipsis">
          Edit Profile
        </h1>
        <button
          onClick={(e) => {
            e.preventDefault();
            update(
              profileImage,
              coverImage,
              name,
              username,
              bio,
              location,
              website
            );
          }}
          className="bg-black text-white px-3 py-1 rounded-xl"
        >
          Save
        </button>
      </div>

      <div className="relative">
        <img
          src={user?.coverImage}
          alt={`${user?.displayName} cover image`}
          className="h-28 md:h-52 w-full object-cover"
        />
        <div className="h-9 w-9 absolute top-[50%] bottom-[50%] left-[50%] right-[50%]  md:h-8 md:w-8 cursor-pointer flex flex-no-shrink justify-center items-center bg-gray-500 rounded-full">
          <CameraIcon className=" w-[70%] h-[70%] text-white" />
          <input
            type="file"
            name=""
            id=""
            className="opacity-0"
            onChange={(e) => handleSelectImage(e, setCoverImage)}
          />
        </div>
        <div className="absolute -bottom-10">
          <Avatar
            src={user?.photoURL}
            className=" border-white border-2 w-16 h-16 md:w-28 md:h-28"
          />
          <div className="h-6 w-6 absolute top-[50%] bottom-[50%] left-[50%] right-[50%]  md:h-8 md:w-8 cursor-pointer flex flex-no-shrink justify-center items-center bg-gray-500 rounded-full box-content">
            <CameraIcon className=" w-[70%] h-[70%] text-white z-10" />
            <input
              type="file"
              name=""
              id=""
              className="opacity-0 z-0"
              onChange={(e) => handleSelectImage(e, setProfileImage)}
            />
          </div>
        </div>
      </div>

      <div className="relative mt-16 space-y-3 w-[95%] flex flex-col justify-center items-center mx-auto">
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          className="w-full"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          className="w-full"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Bio"
          variant="outlined"
          className="w-full"
          onChange={(e) => setBio(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Location"
          variant="outlined"
          className="w-full"
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Website"
          variant="outlined"
          className="w-full"
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
    </div>
  );
};

export default index;
