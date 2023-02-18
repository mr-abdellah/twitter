import { CheckIcon } from "@heroicons/react/24/outline";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../config/firebase";

const handleDeleteTweet = async (reference) => {
  const id = toast.loading("deleting...");
  try {
    const docRef = doc(db, "tweets", reference);
    deleteDoc(docRef)
      .then(() => {
        console.log("Tweet has been deleted successfully.");
      })
      .catch((error) => {
        console.log(`error while removing tweet: ${error}`);
        toast.update(id, {
          render: `Error while deleting Tweet : ${error.message}`,
          type: "error",
          isLoading: false,
          autoClose: true,
          closeOnClick: true,
          progressStyle: { backgroundColor: "#ed420e" },
          icon: <CheckIcon className="text-red-600" />,
        });
      })
      .finally(() => {
        toast.update(id, {
          render: "You have deleted your tweet successfully",
          type: "success",
          isLoading: false,
          autoClose: true,
          closeOnClick: true,
          progressStyle: { backgroundColor: "#00ADED" },
          icon: <CheckIcon className="text-twitter" />,
        });
      });
  } catch (error) {
    console.log(`error while deleting Tweet: ${error}`);
  }
};

export default handleDeleteTweet;
