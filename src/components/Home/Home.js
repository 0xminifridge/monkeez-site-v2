import React, { useEffect } from "react";
// import RarityCardHolder from "../RarityCardHolder/RarityCardHolder";
// import FAQContainer from "../FAQ/FAQContainer";
import WelcomeToTheZungle from "./WelcomeToTheZungle";
import WhatAreMonkeez from "./WhatAreMonkeez";
import MonkeezTribes from "./MonkeezTribes";
import WhatAreZoogz from "./WhatAreZoogz";
import ZoogTypes from "./ZoogTypes";

// import TeamCardHolder from "../Team/TeamCardHolder";
// import RoadMap from "../Roadmap/Roadmap";
// import Carousel from "../Carousel/Carousel";

// import { Helmet } from "react-helmet";
// import {
//   firstSet,
//   fifthSet,
//   fourthSet,
//   secondSet,
//   thirdSet,
// } from "../Carousel/images";

export default function Home({ title }) {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = title;
  }, []);

  return (
    <div>
      {/* <Helmet>
        <meta property="og:title" content={`MONKEEZ`} />
        <meta property="og:description" content="Welcome to the Zungle" />
        <meta property="og:url" content={`https://www.monkeez.io`} />
        <meta
          property="og:image"
          content={`https://www.monkeez.io/images/zungle-map.png`}
        />
        <meta
          property="twitter:image"
          content={`https://www.monkeez.io/images/zungle-map.png`}
        />
        <meta property="twitter:card" content={`summary_large_image`} />
        <meta property="twitter:creator" content={`Welcome to the Zungle`} />
        <meta property="twitter:description" content="Welcome to the Zungle" />
        <title>HOME | MONKEEZ</title>
      </Helmet> */}
      {/* <Hero title={props.title} /> */}
      <div class="relative">
        <div class="z-[2] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold text-center">
          <h1 class="shadow-heading text-white text-[64px] sm:text-[120px] md:text-[150px] leading-[6rem] sm:leading-[10rem] bg-black/70 block px-4 py-2 rounded-lg">
            MONKEEZ
          </h1>
          {/* <h1 className="shadow-lg text-white text-6xl bg-blue-500 p-4">
            Monkeez
          </h1> */}
        </div>
        {/* <div class="">
          <Carousel direction={"left"} images={firstSet} speed={"25"} />
          <Carousel direction={"right"} images={secondSet} speed={"25"} />
          <Carousel direction={"left"} images={thirdSet} speed={"25"} />
          <Carousel direction={"right"} images={fourthSet} speed={"25"} />
          <Carousel direction={"left"} images={fifthSet} speed={"25"} />
        </div> */}
      </div>

      <div>
        <WelcomeToTheZungle />
        <WhatAreMonkeez />
        <MonkeezTribes />
        <WhatAreZoogz />
        <ZoogTypes />
        {/* <RoadMap /> */}
        {/* <TeamCardHolder /> */}
        {/* <FAQContainer /> */}
      </div>
    </div>
  );
}
