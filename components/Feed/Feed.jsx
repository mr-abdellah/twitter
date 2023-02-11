import React, { useContext } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import TweetBox from "../TweetBox/TweetBox";
import TweetComponent from "../Tweet/Tweet";
import { useSelector } from "react-redux";
import { AuthContext } from "../../context/AuthContext";

export default function Feed() {
  const { tweets } = useSelector((state) => state.tweets);

  const { getAllTweets } = useContext(AuthContext);

  return (
    <div className="col-span-7 lg:col-span-5 lg:border-x h-screen overflow-scroll">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <ArrowPathIcon
          onClick={getAllTweets}
          className="h-8 w-8 cursor-pointer text-twitter mr-5 mt-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>

      <TweetBox />

      <div>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}
