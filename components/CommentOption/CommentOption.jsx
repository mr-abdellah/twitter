import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const CommentOption = ({
  setOpenEdit,
  setContentEditable,
  comment,
  reference,
  idx,
}) => {
  const { removeCommentTweet, getAllTweets, addCommentTweet } =
    useContext(AuthContext);

  return (
    <div
      id="dropdownComment1"
      className="flex w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-0 top-20 z-50"
    >
      <ul
        className="py-1 text-sm text-gray-700 dark:text-gray-200 w-full"
        aria-labelledby="dropdownMenuIconHorizontalButton"
      >
        <li
          className="cursor-pointer"
          onClick={() => {
            setOpenEdit(null);
            setContentEditable(null);
          }}
        >
          <p className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            Close
          </p>
        </li>
        <li
          className="cursor-pointer"
          onClick={() => {
            setContentEditable(idx);
            setOpenEdit(null);
          }}
        >
          <p className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            Edit
          </p>
        </li>
        <li
          className="cursor-pointer"
          onClick={() => {
            removeCommentTweet(reference, comment);
            getAllTweets();
            setOpenEdit(null);
          }}
        >
          <p className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            Remove
          </p>
        </li>
      </ul>
    </div>
  );
};

export default CommentOption;
