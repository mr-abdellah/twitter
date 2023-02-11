import React from "react";
import {
  ChatBubbleLeftRightIcon,
  ArrowsRightLeftIcon,
  HeartIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import TimeAgo from "react-timeago";
import englishStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import moment from "moment";
import { Avatar } from "@mui/material";
import Image from "next/image";

const formatter = buildFormatter(englishStrings);

function Tweet({ tweet }) {

  return (
    <div className="flex flex-col space-x-3 border-y p-5 border-gray-100">
      <div className="flex space-x-3">
        {tweet?.photoURL ? (
          <Avatar alt="Remy Sharp" src={tweet.photoURL} />
        ) : (
          <Avatar>{tweet?.owner}</Avatar>
        )}
        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet?.username}</p>
            {/* <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet?.username.replace(/\s+/g, "").toLocaleLowerCase()}
            </p> */}
            <TimeAgo date={tweet?.created_at} formatter={formatter} />
          </div>
          <p className="pt-1">{tweet?.tweetDescription}</p>
          {/* 
          {tweet?.tweetImage && (
            <Image
              src={tweet?.tweetImage}
              className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
              width={100}
              height={100}
            />
          )} */}

          {tweet?.tweetImage && (
            <img
              src={tweet?.tweetImage}
              className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
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

        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className="h-5 w-5" />
          <p>{tweet?.likes?.length}</p>
        </div>

        {/* <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ArrowUpTrayIcon className="h-5 w-5" />
        </div> */}
      </div>
    </div>
  );
}

export default Tweet;
