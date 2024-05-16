import React from "react";
import Sidenav from "../components/Sidenav";
import Typography from "@mui/material/Typography";
import Hero from "./Hero";

export default function page() {
  return (
    <Sidenav>
      <Hero />
    </Sidenav>
  );
}
