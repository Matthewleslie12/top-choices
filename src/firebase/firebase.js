import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import "dotenv/config";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDERID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};
console.log(import.meta.env.VITE_API_KEY);

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage};
export default firebaseConfig;
