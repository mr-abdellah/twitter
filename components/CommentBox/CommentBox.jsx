import React, { useContext, useState } from "react";
import Loader from "../Elements/Loader/Loader";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../config/firebase";
import moment from "moment";

const CommentBox = ({ tweet }) => {
  const { addCommentTweet, user, getAllTweets } = useContext(AuthContext);
  const [sharing, setSharing] = useState(false);
  const [comment, setComment] = useState(null);

  const handleShareComment = async (desc, user) => {
    try {
      setSharing(true);
      const comment = {
        ownerId: auth?.currentUser?.uid,
        owner: {
          name: user?.name,
          username: user?.username,
          profileImage: user?.profileImage,
        },
        created_at: moment().format("lll"),
        comment: desc,
        likes: [],
      };
      await addCommentTweet(tweet?.referenceId, comment);
      await getAllTweets();
      setComment("");
      setSharing(false);
    } catch (error) {
      setSharing(false);
      console.log("error while adding comment : ", error.message);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
          Discussion ({tweet?.comments?.length})
        </h2>
      </div>
      <div className="mb-6">
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 ">
          <label for="comment" className="sr-only">
            Your comment
          </label>
          <input
            type="text"
            id="comment"
            rows="3"
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
            placeholder="Write a comment..."
            required
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-twitter rounded-lg focus:ring-4 focus:ring-twitter dark:focus:ring-twitter hover:bg-twitter"
          onClick={(e) => {
            e.preventDefault();
            handleShareComment(comment, user);
          }}
          disabled={sharing}
        >
          {sharing ? <Loader /> : "Post comment"}
        </button>
      </div>
    </>
  );
};

export default CommentBox;
