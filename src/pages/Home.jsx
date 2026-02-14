import React from "react";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Activities from "../components/sections/Activities";
import Gallery from "../components/sections/Gallery";
import Team from "../components/sections/Team";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Activities />
      <Gallery />
      <Team />
    </>
  );
};

export default Home;
