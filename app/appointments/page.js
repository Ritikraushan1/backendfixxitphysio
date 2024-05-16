import React from "react";
import Sidenav from "../components/Sidenav";
import AppointmentHero from "./AppointmentHero";
import AppointmentNav from "./AppointmentNav";
import AppointmentTable from "./AppointmentTables";

export default function page() {
  return (
    <Sidenav>
      <AppointmentHero />
      <AppointmentNav />
      <AppointmentTable />
    </Sidenav>
  );
}
