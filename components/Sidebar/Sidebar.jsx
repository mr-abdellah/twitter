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
import AuthModal from "../Auth";
import { AuthContext } from "../../context/AuthContext";
import Link from "next/link";

const Sidebar = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const { userToken, user, logout } = useContext(AuthContext);

  console.log("user : ", user);

  return (
    <div className="flex flex-col col-span-2 items-center px-4 md:items-start">
      <img
        className="h-10 w-10 m-3"
        src="https://img.icons8.com/color/344/twitter.png"
        alt=""
      />
      <SidebarRow Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notifications" />
      <SidebarRow Icon={EnvelopeIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow Icon={RectangleStackIcon} title="Lists" />
      {userToken === null ? (
        <SidebarRow
          Icon={UserIcon}
          title="Sign In"
          onclick={() => setOpenLoginModal(!openLoginModal)}
        />
      ) : (
        <SidebarRow
          Icon={UserIcon}
          title="Account"
          img={user?.photoURL}
          href="/profile"
        />
      )}
      <SidebarRow Icon={EllipsisHorizontalCircleIcon} title="More" />
      <SidebarRow
        Icon={ArrowLeftOnRectangleIcon}
        title="Logout"
        onclick={() => {
          logout();
        }}
      />
      <AuthModal openModal={openLoginModal} setOpenModal={setOpenLoginModal} />
    </div>
  );
};

export default Sidebar;
