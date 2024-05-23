import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase"; // Ensure this is the correct path to your firebase config

const Page = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        // Sign-out successful, redirect to login
        navigate("/login");
      })
      .catch((error) => {
        // An error happened, handle error if necessary
        console.error("Error signing out: ", error);
      });
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Page;
