import { React } from "react";

import "./HeroSection.css";
import HeroSections from "./HeroSections";
import Quote from "../qoute/Quote";

const Hero = () => {
  return (
    <>
      <HeroSections />
      <Quote />
    </>
  );
};

export default Hero;
