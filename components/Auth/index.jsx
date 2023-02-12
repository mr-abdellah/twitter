import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import UpdateProfile from "../ProfileModal";

const index = ({ openModal, setOpenModal }) => {
  const [type, setType] = useState("login");

  console.log(type);

  return (
    <div className="flex justify-center items-center m-auto">
      {type === "login" && (
        <Login
          openModal={openModal}
          setOpenModal={setOpenModal}
          setType={setType}
        />
      )}
      {type === "register" && (
        <Register
          openModal={openModal}
          setOpenModal={setOpenModal}
          setType={setType}
        />
      )}

      {type === "update" && (
        <UpdateProfile
          open={openModal}
          setOpen={setOpenModal}
          setType={setType}
        />
      )}
    </div>
  );
};

export default index;
