import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Sidebar from "../components/Sidebar/Sidebar";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Twitter</title>
        <link
          rel="icon"
          href="https://img.icons8.com/color/344/twitter--v1.png"
        />
      </Head>

      <main>
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        {/* Widgets */}
      </main>
    </div>
  );
};

export default Home;
