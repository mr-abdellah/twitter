import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../config/firebase";
import moment from "moment";
import Loader from "../Elements/Loader/Loader";
import CommentBox from "../CommentBox/CommentBox";
import CommentOption from "../CommentOption/CommentOption";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

const TweetComments = ({ id }) => {
  const { tweets } = useSelector((state) => state.tweets);
  const [tweet, setTweet] = useState({});
  const { getAllTweets, updateCommentTweet } = useContext(AuthContext);
  const [openEdit, setOpenEdit] = useState(false);
  const [contentEditable, setContentEditable] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [comment, setComment] = useState(null);

  useEffect(() => {
    setTweet(tweets.find((tweet) => tweet.ownerId === id));
  }, [tweet?.comments, tweets]);

  useEffect(() => {
    getAllTweets();
  }, []);

  return (
    <section className="bg-white py-8 lg:py-16 w-full">
      <div className="max-w-full mx-auto px-4">
        <CommentBox tweet={tweet} />
        {tweet?.comments?.map((comment, idx) => {
          return (
            <article className="p-6 mb-6 text-base bg-white rounded-lg relative">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900  truncate">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src={comment?.owner?.profileImage}
                      alt={comment?.owner?.name}
                    />
                    {comment?.owner?.username}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    <time
                      pubdate
                      datetime="2022-02-08"
                      title="February 8th, 2022"
                    >
                      {comment.created_at}
                    </time>
                  </p>
                </div>
                {tweet?.ownerId === auth.currentUser.uid && (
                  <button
                    id="dropdownComment1Button"
                    data-dropdown-toggle="dropdownComment1"
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 "
                    type="button"
                    onClick={() => {
                      // handleOpenEdit(idx);
                      setOpenEdit(idx);
                    }}
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
                )}
                {openEdit === idx &&
                  tweet?.ownerId === auth.currentUser.uid && (
                    <CommentOption
                      setOpenEdit={setOpenEdit}
                      comment={comment}
                      reference={tweet?.referenceId}
                      setContentEditable={setContentEditable}
                      idx={idx}
                    />
                  )}
              </footer>
              {contentEditable === idx ? (
                <div className="flex items-center justify-between w-full mb-3 seva-fields formkit-fields">
                  <div class="relative w-full mr-3 formkit-field flex items-center">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <ChatBubbleLeftRightIcon className="h-5 w-5" />
                    </div>

                    <input
                      id="member_email"
                      class="formkit-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 focus:outline-none"
                      name="email_address"
                      aria-label="Email Address"
                      placeholder="Your email address..."
                      defaultValue={comment.comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  <button
                    data-element="submit"
                    class="px-4 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 whitespace-nowrap"
                    onClick={(e) => {
                      e.preventDefault();
                      updateCommentTweet(tweet?.referenceId, { comment });
                    }}
                  >
                    Update Comment
                  </button>
                </div>
              ) : (
                <p
                  className="text-gray-500 focus-within:border-black "
                  contentEditable={contentEditable === idx ? true : false}
                  suppressContentEditableWarning={true}
                >
                  {comment.comment}
                </p>
              )}

              <div className="flex items-center mt-4 space-x-4">
                <button
                  type="button"
                  className="flex items-center text-sm text-gray-500 hover:underline"
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
