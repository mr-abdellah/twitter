import { Avatar } from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Menu from "../Menu/Menu";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  console.log(user);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 rounded-b-lg h-24 md:hidden">
      <div className=" flex justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  backdrop-blur-sm drop-shadow-sm relative">
        <button className="absolute left-6" onClick={() => setOpen(true)}>
          <Avatar src={user?.profileImage} alt="" />
        </button>
        <img
          className="h-10 w-10 mx-auto"
          src="https://img.icons8.com/color/344/twitter.png"
          alt=""
        />
      </div>
      <Menu open={open} setOpen={setOpen} />
    </div>
  );
};

export default Navbar;
