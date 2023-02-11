import React, { useContext, useState } from "react";
import {
  ChatBubbleLeftRightIcon,
  ArrowsRightLeftIcon,
  HeartIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import TimeAgo from "react-timeago";
import englishStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import moment from "moment";
import { Avatar } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../config/firebase";
import AuthModal from "../../components/Auth";

const formatter = buildFormatter(englishStrings);

function Tweet({ tweet }) {
  const { likeTweet, userToken } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col space-x-3 border-y p-5 border-gray-100 w-full">
      <div className="flex space-x-3 w-full">
        {tweet?.owner?.profileImage ? (
          <Avatar alt="Remy Sharp" src={tweet?.owner?.profileImage} />
        ) : (
          <Avatar>{tweet?.owner?.name}</Avatar>
        )}
        <div className="w-full">
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet?.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet?.owner?.username.replace(/\s+/g, "").toLocaleLowerCase()}
            </p>
            <TimeAgo date={tweet?.created_at} formatter={formatter} />
          </div>
          <p className="pt-1">{tweet?.tweetDescription}</p>

          {tweet?.tweetImage && (
            <img
              src={tweet?.tweetImage}
              className="w-full max-h-72 rounded-lg object-center shadow-sm"
            />
          )}
        </div>
      </div>
      <div className="mt-5 flex justify-start space-x-3">
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ChatBubbleLeftRightIcon className="h-5 w-5" />
          <p>{tweet?.comments?.length}</p>
        </div>
        {/* <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ArrowsRightLeftIcon className="h-5 w-5" />
        </div> */}
        <div
          onClick={() => {
            userToken
              ? likeTweet(
                  tweet?.referenceId,
                  auth?.currentUser?.uid,
                  tweet?.referenceId
                )
              : setOpen(true);
          }}
          className="flex cursor-pointer items-center space-x-3 text-gray-400"
        >
          {tweet.likes.includes(auth?.currentUser?.uid) ? (
            <HeartSolid className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5" />
          )}
          <p>{tweet?.likes?.length}</p>
        </div>
        <AuthModal openModal={open} setOpenModal={setOpen} />
        {/* <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ArrowUpTrayIcon className="h-5 w-5" />
        </div> */}
      </div>
    </div>
  );
}

export default Tweet;
