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

  return (
    <div className="flex flex-col col-span-2 items-center px-4 md:items-start">
      <img
        className="h-10 w-10 m-3"
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
          <SidebarRow Icon={HashtagIcon} title="Explore" />
          <SidebarRow Icon={BellIcon} title="Notifications" />
          <SidebarRow Icon={EnvelopeIcon} title="Messages" />
          <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
          <SidebarRow Icon={RectangleStackIcon} title="Lists" />
          <SidebarRow
            Icon={UserIcon}
            title="Account"
            // onclick={() => setProfileModal(!profileModal)}
            href="/profile"
          />
        </>
      )}
      <SidebarRow Icon={EllipsisHorizontalCircleIcon} title="More" />
      {userToken && (
        <SidebarRow
          Icon={ArrowLeftOnRectangleIcon}
          title="Logout"
          onclick={() => {
            logout();
          }}
        />
      )}
      <AuthModal openModal={openLoginModal} setOpenModal={setOpenLoginModal} />
      <ProfileModal open={profileModal} setOpen={setProfileModal} />
    </div>
  );
};

export default Sidebar;
