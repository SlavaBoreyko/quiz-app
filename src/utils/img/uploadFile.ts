import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase.config";


const uploadFile = (file: any, setProgress:any, setUrl: any) => {
  const name = new Date().getTime() + file.name;
  const storageRef = ref(storage, name);
  const uploadTask = uploadBytesResumable(storageRef, file);
  
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = 
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is ", + progress + "% done");
      setProgress(progress);
      switch(snapshot.state) {
      case "paused":
        console.log("Upload is paused");
        break;
      case "running":
        console.log("Upload is running");
        break;
      default:
        break;  
      }
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setUrl(downloadURL));
    }
  );
};


export default uploadFile;