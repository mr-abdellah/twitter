import Link from "next/link";
import React, { SVGProps } from "react";

const SidebarRow = ({ Icon, title, onclick, img = null, href }) => {
  return (
    <>
      {!Icon ? (
        <Link
          href={href ? href : "/"}
          onClick={onclick}
          className="flex max-w-fit items-center space-x-2 px-4 py-3 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-100 group"
        >
          <img src={img} alt={img} />
          <p className="hidden text-base font-light group-hover:text-twitter md:inline-flex lg:text-xl">
            {title}
          </p>
        </Link>
      ) : (
        <Link
          href={href ? href : "/"}
          onClick={onclick}
          className="flex max-w-fit items-center space-x-2 px-4 py-3 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-100 group"
        >
          <Icon className="h-6 w-6" />
          <p className="hidden text-base font-light group-hover:text-twitter md:inline-flex lg:text-xl">
            {title}
          </p>
        </Link>
      )}
    </>
  );
};

export default SidebarRow;
