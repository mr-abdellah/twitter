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

const index = ({ open, setOpen, setType }) => {
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

  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);

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
        name: auth.currentUser.name === data.name ? user.name : name,
        photoURL: profileImglink,
      }).catch((error) => {
        console.log("error while updating auth profile", error);
        setOpen(false);
      });
      setOpen(false);
    } catch (error) {
      console.log("error while updating profile", error);
      setOpen(false);
    }
  };

  console.log(cover);

  return (
    <div>
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full ${
          open
            ? "flex backdrop-blur-sm drop-shadow-2xl"
            : "hidden backdrop-blur-none"
        }`}
      >
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit your profile
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="staticModal"
                onClick={() => {
                  setOpen(false);
                  setType("login");
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="relative">
                <img
                  src={cover}
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
                    onChange={(event) =>
                      setCover(URL.createObjectURL(event?.target?.files[0]))
                    }
                  />
                </div>
                <div className="absolute -bottom-10">
                  <Avatar
                    src={profile}
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
                      onChange={(event) =>
                        setProfile(URL.createObjectURL(event?.target?.files[0]))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="relative pt-16 space-y-3 w-[95%] flex flex-col justify-center items-center mx-auto">
                <InputComponent name="name" control={control} label="Name" />
                <InputComponent
                  name="username"
                  control={control}
                  label="Username"
                />
                <InputComponent name="bio" control={control} label="Bio" />
                <InputComponent
                  name="location"
                  control={control}
                  label="Location"
                />
                <InputComponent
                  name="website"
                  control={control}
                  label="Website"
                />
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="staticModal"
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleSubmit(onSubmit)}
              >
                Update
              </button>
              <button
                data-modal-hide="staticModal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={() => {
                  setOpen(false);
                  setType("login");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
