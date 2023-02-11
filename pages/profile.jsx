import Head from "next/head";
import Wrapper from "../components/Wrapper";
import Profile from "../components/Profile";

const Home = () => {
  return (
    <div className="mx-auto  lg:max-w-6xl h-screen">
      <Head>
        <title>Twitter Profile</title>
        <link
          rel="icon"
          href="https://img.icons8.com/color/344/twitter--v1.png"
        />
      </Head>

      <Wrapper>
        <Profile />
      </Wrapper>
    </div>
  );
};

export default Home;
