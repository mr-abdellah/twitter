import React, { useState } from "react";

import {
  CalendarIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function TweetBox({}) {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col space-x-2 p-5 ">
      <div className="flex items-center">
        <img
          className="h-8 w-8 md:h-14 md:w-14 rounded-full object-cover"
          src="https://avatars.githubusercontent.com/u/98021746?v=4"
          alt=""
        />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="What's Happening?"
          className="h-12 pl-4 md:h-24 w-full text-xl outline-none placeholder:text-base md:placeholder:text-xl"
        />
      </div>
      <div className="flex items-center">
        <div className="flex flex-1 items-center space-x-2 text-twitter">
          {/* icons */}
          <PhotoIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
          <MagnifyingGlassIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
          <FaceSmileIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
          <CalendarIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
          <MapPinIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
        </div>

        <button
          disabled={!input}
          className="bg-twitter text-white px-3 py-1 md:px-5 md:py-2 font-normal rounded-full disabled:opacity-40"
        >
          Tweet
        </button>
      </div>
    </div>
  );
}
