import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed/Feed";
import Sidebar from "../components/Sidebar/Sidebar";
import Widget from "../components/Widget/Widget";
import { Tweet } from "../typings";
import { fetchTweets } from "../utils/fetchTweets";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
interface Props {
  tweets: Tweet[]
}

TimeAgo.addDefaultLocale(en);

const Home = ({tweets}:Props) => {
  console.log(tweets);
  
  return (
    <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl ">
      <Head>
        <title>Twitter</title>
        <link
          rel="icon"
          href="https://img.icons8.com/color/344/twitter--v1.png"
        />
      </Head>

      <main className="grid grid-cols-9">
        <Sidebar />
        <Feed tweets={tweets}/>
        <Widget />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {

  const tweets = await fetchTweets();

  return {
    props: {
      tweets,
    },
  }
}