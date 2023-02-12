import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Widget from "../Widget/Widget";

const index = ({ children }) => {
  return (
    <main className="md:grid md:grid-cols-9 md:h-full relative overflow-hidden">
      <Sidebar />
      {children}
      <Widget />
    </main>
  );
};

export default index;
