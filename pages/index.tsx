import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed/Feed";
import Sidebar from "../components/Sidebar/Sidebar";
import Widget from "../components/Widget/Widget";

const Home: NextPage = () => {
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
        <Feed />
        <Widget />
      </main>
    </div>
  );
};

export default Home;
