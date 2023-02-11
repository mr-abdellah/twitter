import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Widget from "../Widget/Widget";

const index = ({ children }) => {
  return (
    <main className="grid grid-cols-9 h-full relative">
      <Sidebar />
      {children}
      <Widget />
    </main>
  );
};

export default index;
