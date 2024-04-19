import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBby8w9LoEh2NLwJnA4w9cC51aLd3REp90",
  authDomain: "avidhilda-7f3aa.firebaseapp.com",
  projectId: "avidhilda-7f3aa",
  storageBucket: "avidhilda-7f3aa.appspot.com",
  messagingSenderId: "883569303161",
  appId: "1:883569303161:web:5cedde484753899987fea8",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const uploadToFirebase = async (file: any) => {
  const imageRef = ref(storage, `uc/photos/${file.name}`);
  return uploadBytes(imageRef, file).then((snapshot) => {
    return getDownloadURL(snapshot.ref);
  });
};
