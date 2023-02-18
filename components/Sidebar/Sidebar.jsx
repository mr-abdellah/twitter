import React, { SVGProps, useContext, useState } from "react";
import SidebarRow from "../SidebarRow/SidebarRow";
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  EllipsisHorizontalCircleIcon,
  EnvelopeIcon,
  UserIcon,
  HomeIcon,
  RectangleStackIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../../context/AuthContext";
import AuthModal from "../Auth";
import ProfileModal from "../ProfileModal";

const Sidebar = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const [profileModal, setProfileModal] = useState(false);

  const { userToken, user, logout } = useContext(AuthContext);

  const array = [
    {
      name: "Abdellah",
      age: 19,
    },
    {
      name: "Vladimir",
      age: 20,
    },
    {
      name: "Vicky",
      age: 99,
    },
  ];

  console.log(array.filter((item) => item.age === 99));

  return (
    <div className="flex flex-row w-full justify-between absolute z-40 left-0 right-0 md:relative bg-white bottom-0 md:flex-col md:col-span-2 items-center px-4 md:items-start md:h-full md:justify-start">
      <img
        className="h-10 w-10 m-3 hidden md:flex"
        src="https://img.icons8.com/color/344/twitter.png"
        alt=""
      />

      {userToken === null ? (
        <SidebarRow
          Icon={UserIcon}
          title="Sign In"
          onclick={() => setOpenLoginModal(!openLoginModal)}
        />
      ) : (
        <>
          <SidebarRow Icon={HomeIcon} title="Home" />
          <SidebarRow
            Icon={HashtagIcon}
            title="Explore"
            classname="hidden md:flex"
          />
          <SidebarRow Icon={BellIcon} title="Notifications" />
          <SidebarRow Icon={EnvelopeIcon} title="Messages" />
          <SidebarRow
            Icon={BookmarkIcon}
            title="Bookmarks"
            classname="hidden md:flex"
          />
          <SidebarRow
            Icon={RectangleStackIcon}
            title="Lists"
            classname="hidden md:flex"
          />
          <SidebarRow
            Icon={UserIcon}
            title="Account"
            // onclick={() => setProfileModal(!profileModal)}
            href="/profile"
          />
        </>
      )}
      <SidebarRow
        Icon={EllipsisHorizontalCircleIcon}
        title="More"
        classname="hidden md:flex"
      />
      {userToken && (
        <SidebarRow
          Icon={ArrowLeftOnRectangleIcon}
          title="Logout"
          onclick={() => {
            logout();
          }}
        />
      )}
      <div className="absolute top-52">
        <AuthModal
          openModal={openLoginModal}
          setOpenModal={setOpenLoginModal}
        />
        <ProfileModal open={profileModal} setOpen={setProfileModal} />
      </div>
    </div>
  );
};

export default Sidebar;
