import React from "react";
import TweetBox from "../TweetBox/TweetBox";
import TweetComponent from "../Tweet/Tweet";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import Link from "next/link";

export default function Feed() {
  const { tweets } = useSelector((state) => state.tweets);

  return (
    <div className="col-span-7 lg:col-span-5 lg:border-x h-screen overflow-scroll">
      <Header title="Home" />
      <TweetBox />

      <div>
        {tweets.map((tweet) => (
          <Link href={`/tweet/${tweet?.ownerId}`}>
            <TweetComponent key={tweet._id} tweet={tweet} />
          </Link>
        ))}
      </div>
    </div>
  );
}
