import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../config/firebase";
import moment from "moment";
import Loader from "../Elements/Loader/Loader";
import CommentBox from "../CommentBox/CommentBox";

const TweetComments = ({ id }) => {
  const { tweets } = useSelector((state) => state.tweets);
  const [tweet, setTweet] = useState({});

  useEffect(() => {
    setTweet(tweets.find((tweet) => tweet.ownerId === id));
  }, [tweet, tweets]);

  const [openEdit, setOpenEdit] = useState(false);

  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 w-full">
      <div className="max-w-full mx-auto px-4">
        <CommentBox tweet={tweet} />
        {tweet?.comments?.map(({ comment, created_at, likes, owner }) => {
          return (
            <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white truncate">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src={owner?.profileImage}
                      alt={owner?.name}
                    />
                    {owner?.username}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    <time
                      pubdate
                      datetime="2022-02-08"
                      title="February 8th, 2022"
                    >
                      {created_at}
                    </time>
                  </p>
                </div>
                <button
                  id="dropdownComment1Button"
                  data-dropdown-toggle="dropdownComment1"
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  type="button"
                  onClick={() => setOpenEdit(!openEdit)}
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  </svg>
                  <span className="sr-only">Comment settings</span>
                </button>
                {/* <!-- Dropdown menu --> */}
              </footer>
              <p className="text-gray-500 dark:text-gray-400">{comment}</p>
              <div className="flex items-center mt-4 space-x-4">
                <button
                  type="button"
                  className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
                >
                  <svg
                    aria-hidden="true"
                    className="mr-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    ></path>
                  </svg>
                  Like
                </button>
              </div>

              {/*  */}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default TweetComments;
