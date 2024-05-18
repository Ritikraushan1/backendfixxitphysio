import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDk1-s2fa8Wb9l6TfqIYh72Hj-EzU_Ou_g",
  authDomain: "fixxitphysio-69d3d.firebaseapp.com",
  projectId: "fixxitphysio-69d3d",
  storageBucket: "fixxitphysio-69d3d.appspot.com",
  messagingSenderId: "685593699146",
  appId: "1:685593699146:web:e033c1288a6773209cd7b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
