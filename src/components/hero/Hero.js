import { React, useState, setTimeout, useEffect } from "react";

import "./HeroSection.css";
import HeroSections from "./HeroSections";

const Hero = () => {
  const [loading, setLoading] = useState();

  // useEffect(() => {
  //   setTimeout(() => {
  //     alert("444")
  //   }, 2000);
  // }, []);

  // setTimeout(() => {
  //       alert("444")
  //     }, 2000);

  return (
    <>
      <HeroSections />
    </>
  );
};

export default Hero;
