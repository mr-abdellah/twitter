import Head from "next/head";
import Wrapper from "../components/Wrapper";
import EditProfile from "../components/EditProfile";

const editProfile = () => {
  return (
    <div className="mx-auto  lg:max-w-6xl h-screen">
      <Head>
        <title>Edit Profile</title>
        <link
          rel="icon"
          href="https://img.icons8.com/color/344/twitter--v1.png"
        />
      </Head>

      <Wrapper>
        <EditProfile />
      </Wrapper>
    </div>
  );
};

export default editProfile;
