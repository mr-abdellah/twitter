import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  ArrowPathIcon,
  ArrowLeftIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Avatar, Button, TextField } from "@mui/material";
import handleSelectImage from "../../utils/ImagePicker";
import handleUploadImage from "../../utils/UploadImage";
import { auth } from "../../config/firebase";
import { updateProfile } from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import InputComponent from "../Input/InputComponent";

const index = () => {
  const { user, updateUserCollection, getUserCollection } =
    useContext(AuthContext);

  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    reset,
  } = useForm({
    defaultValues: user,
  });

  useEffect(() => {
    if (user) reset(user);
  }, [user]);

  const onSubmit = async (data) => {
    console.log("profile data : ", data);
    try {
      const profileImglink =
        data.profileImage !== user?.profileImage
          ? await handleUploadImage(data.profileImage[0])
          : user?.profileImage;

      const coverImglink =
        data.coverImage !== user?.coverImage
          ? await handleUploadImage(data.coverImage[0])
          : user?.coverImage;

      await updateUserCollection({
        profileImage: profileImglink,
        coverImage: coverImglink,
        name: data.name ? data.name : user?.name,
        username: data.username ? data.username : user?.username,
        bio: data.bio ? data.bio : user?.bio,
        location: data.location ? data.location : user?.location,
        website: data.website ? data.website : user?.website,
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
          onClick={handleSubmit(onSubmit)}
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
            {...register("coverImage")}
          />
        </div>
        <div className="absolute -bottom-10">
          <Avatar
            src={user?.profileImage}
            className=" border-white border-2 w-16 h-16 md:w-28 md:h-28"
          />
          <div className="h-6 w-6 absolute top-[50%] bottom-[50%] left-[50%] right-[50%]  md:h-8 md:w-8 cursor-pointer flex flex-no-shrink justify-center items-center bg-gray-500 rounded-full box-content">
            <CameraIcon className=" w-[70%] h-[70%] text-white z-10" />
            <input
              type="file"
              name=""
              id=""
              className="opacity-0 z-0"
              {...register("profileImage")}
            />
          </div>
        </div>
      </div>

      <div className="relative mt-16 space-y-3 w-[95%] flex flex-col justify-center items-center mx-auto">
        <InputComponent name="name" control={control} label="Name" />
        <InputComponent name="username" control={control} label="Username" />
        <InputComponent name="bio" control={control} label="Bio" />
        <InputComponent name="location" control={control} label="Location" />
        <InputComponent name="website" control={control} label="Website" />
      </div>
    </div>
  );
};

export default index;
