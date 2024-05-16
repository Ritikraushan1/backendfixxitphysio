// pages/index.js
"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "./firebase";

export default function Auth() {
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/dashboard"); // Redirect to profile page if user is signed in
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  return (
    <div className="">
      <div className="">
        <div className=" flex flex-col items-center justify-center">
          <p className=" text-black text-2xl font-bold my-auto mx-auto pt-60">Doctor's Login</p>
        </div>
        <div className="flex flex-col items-center justify-center pt-5">
          <button onClick={handleSignInWithGoogle} className=" bg-slate-700 mx-auto px-3 py-2 border-2 border-black rounded-lg text-white">Sign In With Google</button>
        </div>
      </div>
    </div>
  );
}
