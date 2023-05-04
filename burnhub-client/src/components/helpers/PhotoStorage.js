import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
  } from "firebase/storage";
  
  // NOTES!
  // photoStorage.upload() --- 2 params ---> (bucket, file)
  
  // bucket --> the name of the folder in firebase where
  // your file should go.
  // EX: "profile_images", "pet_photos"
  
  // file ---> the file you are uploading
  
  // photoStorage.delete() -- 1 param ---> (filepath)
  
  // Deletes the file BUT don't forget to also delete the reference in your database
  
  export const photoStorage = {
    // Upload a photo or file to your firebase storage
    upload: function(bucket, file) {
      return new Promise((res) => {
        let photoPath;
        const storage = getStorage();
        const storageRef = ref(storage, `${bucket}/${file.name}`);
        uploadBytes(storageRef, file)
          .then((snapshot) => {
            photoPath = snapshot.ref._location.path;
            getDownloadURL(snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              // returns the url where it is hosted in firebase
              const photoObject = {
                downloadURL: downloadURL,
                path: photoPath,
              };
              console.log("Photo Object", photoObject);
              res(photoObject);
            });
          })
          .catch((error) => {
            console.log("error", error);
          });
      });
    },
    delete: function(filepath) {
      return new Promise((res) => {
        const storage = getStorage();
        const storageRef = ref(storage, filepath);
        deleteObject(storageRef)
          .then(console.log("File Deleted"))
          .catch((error) => {
            console.log("error", error);
          });
      });
    },
  };
  