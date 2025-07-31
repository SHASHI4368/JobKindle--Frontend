import React from "react";
import Header from "./main/header";
import Intro from "./main/intro";
import Featured from "./main/featured";
import Offer from "./main/offer";
import Pros from "./main/pros";
import Footer from "./main/footer";

const Home = () => {
  return (
    <div className="w-full h-full min-h-screen flex flex-col">
      <Header />
      <Intro />
      <Featured />
      <Offer />
      <Pros />
      <Footer />
    </div>
  );
};

export default Home;
