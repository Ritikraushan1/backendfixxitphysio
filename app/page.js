import Image from "next/image";
import Auth from "./Auth";

export default function Home() {
  return (
    <div className=" bg-white w-screen h-screen">
      <Auth />
    </div>
  );
}
