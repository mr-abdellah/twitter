import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed/Feed";
import Sidebar from "../components/Sidebar/Sidebar";
import Widget from "../components/Widget/Widget";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

const Home = ({ tweets }) => {
  console.log(tweets);

  return (
    <div className="mx-auto  lg:max-w-6xl h-screen">
      <Head>
        <title>Twitter</title>
        <link
          rel="icon"
          href="https://img.icons8.com/color/344/twitter--v1.png"
        />
      </Head>

      <main className="grid grid-cols-9 h-full">
        <Sidebar />
        <Feed tweets={tweets} />
        <Widget />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async (context) => {
  const tweets = [];

  return {
    props: {
      tweets,
    },
  };
};
