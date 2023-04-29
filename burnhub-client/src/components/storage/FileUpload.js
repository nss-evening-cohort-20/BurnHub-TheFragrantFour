import { photoStorage } from "../helpers/photoStorage";
import { useState } from "react";

// Photo Upload component

export const FileUpload = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // Handles selecting an image
  const handleChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  // Handles calling the upload image function
  const handleUpload = () => {
    photoStorage.upload("images", image).then((photoObject) => {
      // Returns image object, you will want to add these properties
      // to an object in your database
      // EX: a user if it's a profile picture
      setImageUrl(photoObject.downloadURL);
    });
  };

  return (
    <>
      <div>
        {/* A file upload is simply an input with type "file" */}
        <input type="file" onChange={handleChange} />
        <button basic color="green" onClick={handleUpload}>
          Upload Photo
        </button>
      </div>
      {/* Example of how you can display image with URL */}
      {imageUrl && <img src={imageUrl} />}
    </>
  );
};