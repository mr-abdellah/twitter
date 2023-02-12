import { ArrowPathIcon } from "@heroicons/react/24/outline";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ title }) => {
  const { getAllTweets } = useContext(AuthContext);
  return (
    <div className="flex items-center justify-between">
      <h1 className="p-5 pb-0 text-xl font-bold">{title}</h1>
      <ArrowPathIcon
        onClick={() => {
          getAllTweets();
        }}
        className="h-8 w-8 cursor-pointer text-twitter mr-5 mt-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
      />
    </div>
  );
};

export default Header;
