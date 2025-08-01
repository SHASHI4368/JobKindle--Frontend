import React from "react";
import Intro from "./main/intro";
import Featured from "./main/featured";
import Offer from "./main/offer";
import Pros from "./main/pros";
import Footer from "./main/footer";

const Home = () => {
  return (
    <div className="w-full h-full min-h-screen flex flex-col">
      <Intro />
      <Featured />
      <Offer />
      <Pros />
      <Footer />
    </div>
  );
};

export default Home;
