import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";

const handleUploadImage = async (image) => {
  try {
    const storageRef = ref(storage, `files/${image.name}`);
    const url = await uploadBytes(storageRef, image).then(() =>
      getDownloadURL(storageRef)
    );
    return url;
  } catch (error) {}
};

export default handleUploadImage;
