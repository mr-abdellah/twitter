import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import handleUploadImage from "../UploadImage";
import moment from "moment";

const handleShareTweet = async (
  setSharing,
  image,
  desc,
  name,
  username,
  profileImage
) => {
  try {
    setSharing(true);
    const tweetImageLink = image ? await handleUploadImage(image) : null;
    await addDoc(collection(db, "tweets"), {
      ownerId: auth?.currentUser?.uid,
      owner: {
        name: name,
        username: username,
        profileImage: profileImage,
      },
      created_at: moment().format("lll"),
      tweetImage: tweetImageLink,
      tweetDescription: desc,
      likes: [],
      comments: [],
    });
    setSharing(false);
  } catch (error) {
    console.log("error while uploading tweet", error.message);
    setSharing(false);
  }
};
export default handleShareTweet;
