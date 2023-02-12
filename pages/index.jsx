import Head from "next/head";
import Wrapper from "../components/Wrapper";
import Feed from "../components/Feed/Feed";

const Home = ({ tweets }) => {
  return (
    <div className="mx-auto lg:max-w-6xl h-full">
      <Head>
        <title>Twitter</title>
        <link
          rel="icon"
          href="https://img.icons8.com/color/344/twitter--v1.png"
        />
      </Head>

      <Wrapper>
        <Feed />
      </Wrapper>
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
