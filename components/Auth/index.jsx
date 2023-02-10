import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const index = ({ openModal, setOpenModal }) => {
  const [type, setType] = useState("login");

  return (
    <div className="flex justify-center items-center m-auto">
      {type === "login" ? (
        <Login
          openModal={openModal}
          setOpenModal={setOpenModal}
          setType={setType}
        />
      ) : (
        <Register
          openModal={openModal}
          setOpenModal={setOpenModal}
          setType={setType}
        />
      )}
    </div>
  );
};

export default index;
