import React, { useEffect, useState } from "react";
import TweetComponent from "../../components/Tweet/Tweet";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header/Header";
import TweetComments from "../../components/TweetComments/TweetComments";

const TweetDetail = ({}) => {
  const router = useRouter();
  const [tweet, setTweet] = useState({});

  const { tweets } = useSelector((state) => state.tweets);

  useEffect(() => {
    const { id } = router.query;
    const res = tweets.find((tweet) => tweet.ownerId === id);
    setTweet(res);
  }, [router, tweets]);
  console.log(tweet);

  return (
    <Wrapper>
      <div className="col-span-7 lg:col-span-5 lg:border-x h-screen overflow-scroll">
        <Header title="Tweet details" />
        <TweetComponent key={tweet?.ownerId} tweet={tweet} />
        <TweetComments id={tweet?.ownerId} />
      </div>
    </Wrapper>
  );
};

export default TweetDetail;
