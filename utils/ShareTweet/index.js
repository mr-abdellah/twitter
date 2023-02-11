import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import handleUploadImage from "../UploadImage";
import moment from "moment";

const handleShareTweet = async (image, desc) => {
  try {
    if (image && desc) {
      const tweetImageLink = await handleUploadImage(image);
      await addDoc(collection(db, "tweets"), {
        ownerId: auth?.currentUser?.uid,
        owner: auth?.currentUser?.displayName,
        created_at: moment().format("lll"),
        tweetImage: tweetImageLink,
        tweetDescription: desc,
        likes: [],
        comments: [],
      });
    }
  } catch (error) {
    console.log("error while uploading tweet", error.message);
  }
};
export default handleShareTweet;
