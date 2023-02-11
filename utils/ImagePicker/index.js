const handleSelectImage = (e, setImage) => {
  setImage(e.target.files[0]);
};

export default handleSelectImage;
