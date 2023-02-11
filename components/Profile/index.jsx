import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ArrowPathIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Avatar, Button } from "@mui/material";

const Profile = () => {
  const { user } = useContext(AuthContext);

  console.log("user data : ", user);

  return (
    <div className="col-span-7 lg:col-span-5 lg:border-x relative">
      <div className="sticky flex items-center justify-between h-10 overflow-hidden text-ellipsis mt-2 md:mx-3">
        <Link href="/" className="h-4 w-[25%]  md:h-8 md:w-8 cursor-pointer">
          <ArrowLeftIcon className="w-full h-full" />
        </Link>
        <h1 className="text-xs w-[75%] md:text-lg font-bold whitespace-nowrap text-ellipsis">
          {user?.name}
        </h1>
      </div>

      <div className="relative">
        <img
          src={user?.coverImage}
          alt={`${user?.name} cover image`}
          className="h-28 md:h-52 w-full object-cover"
        />
        <Avatar
          src={user?.profileImage}
          className="absolute -bottom-10 left-5 border-white border-2 w-16 h-16 md:w-28 md:h-28"
        />
        <Link
          href="/editprofile"
          className="absolute -bottom-10 right-5 border-gray-500 border-1 p-1 "
        >
          Edit profile
        </Link>
      </div>

      <div className="relative top-16">
        <h1 className="font-bold">{user?.name}</h1>
        <p className="text-twitterGray">@{user?.username}</p>
        <p className="">@{user?.bio}</p>
        {user?.profileCategory && (
          <p className="text-twitterGray">@{user?.profileCategory}</p>
        )}
        <p className="text-twitterGray">@{user?.location}</p>
      </div>
    </div>
  );
};

export default Profile;
