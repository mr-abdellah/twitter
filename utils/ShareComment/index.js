import { useContext } from "react";
import { auth } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment";

const handleShareComment = async (
  setSharing,
  desc,
  user,
  tweet,
  addCommentTweet
) => {
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

    setSharing(false);
  } catch (error) {
    setSharing(false);
    console.log("error while adding comment : ", error.message);
  }
};
export default handleShareComment;
