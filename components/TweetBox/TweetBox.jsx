import React, { useContext, useState } from "react";

import {
  CalendarIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import handleSelectImage from "../../utils/ImagePicker";
import handleShareTweet from "../../utils/ShareTweet";
import { AuthContext } from "../../context/AuthContext";
import { Avatar } from "@mui/material";

export default function TweetBox({}) {
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);

  const { user, getAllTweets } = useContext(AuthContext);
  console.log("image :", user);

  const [sharing, setSharing] = useState(false);

  return (
    <div className="flex flex-col space-x-2 p-5 ">
      <div className="flex items-center">
        <Avatar src={user?.profileImage} />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="What's Happening?"
          className="h-12 pl-4 md:h-24 w-full text-xl outline-none placeholder:text-base md:placeholder:text-xl"
        />
      </div>
      <div className="flex items-center">
        <div className="flex flex-1 items-center space-x-2 text-twitter">
          {/* icons */}
          <div className="h-5 w-5 relative overflow-hidden ">
            <input
              type="file"
              name=""
              id=""
              onChange={(e) => {
                handleSelectImage(e, setImage);
              }}
              className="opacity-0 absolute cursor-pointer z-20"
            />
            <PhotoIcon className=" w-full h-full" />
          </div>
          {/* <MagnifyingGlassIcon className="h-5 w-5 cursor-pointer " /> */}
          <FaceSmileIcon className="h-5 w-5 cursor-pointer " />
          <CalendarIcon className="h-5 w-5 cursor-pointer " />
          <MapPinIcon className="h-5 w-5 cursor-pointer " />
        </div>

        <button
          disabled={!input || sharing}
          className="bg-twitter text-white px-3 py-1 md:px-5 md:py-2 font-normal rounded-full disabled:opacity-40"
          onClick={() => {
            handleShareTweet(
              setSharing,
              image,
              input,
              user?.name,
              user?.username,
              user?.profileImage
            );
            getAllTweets();
            setInput("");
            setImage(null);
          }}
        >
          Tweet
        </button>
      </div>
    </div>
  );
}
