import React from "react";
import SidebarRow from "./../SidebarRow/SidebarRow";
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  EllipsisHorizontalCircleIcon,
  EnvelopeIcon,
  UserIcon,
  HomeIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";

function Sidebar() {
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
      <SidebarRow Icon={UserIcon} title="Sign In" />
      <SidebarRow Icon={EllipsisHorizontalCircleIcon} title="More" />
    </div>
  );
}

export default Sidebar;
