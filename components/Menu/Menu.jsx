import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { XCircleIcon } from "@heroicons/react/24/outline";

const Menu = ({ open, setOpen }) => {
  const { user } = useContext(AuthContext);

  console.log(user);
  return (
    <div
      className={`absolute top-0 left-0 bottom-0 bg-black h-screen  ${
        open ? "flex backdrop-blur-sm drop-shadow-sm z-50 w-52" : "hidden"
      }`}
    >
      <div className="">
        <XCircleIcon
          className="text-white w-6 h-6"
          onClick={() => setOpen(false)}
        />
        <h1 className="text-white ">
          please dont be afraid i still working on this hehe
        </h1>
      </div>
    </div>
  );
};

export default Menu;
