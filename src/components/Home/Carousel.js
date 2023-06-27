import React, { useState, useRef } from "react";
import Marquee from "react-fast-marquee";
import { MONKEEZ_THUMBNAIL_URL_SMALL } from "../../utils/metadata";

function CarouselImage({ item }) {
  const [hovering, setHovering] = useState(false);
  return (
    <a
      href={`/monkeez/${item}`}
      class="border-4 border-solid border-black block"
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div class="relative text-black">
        {hovering && <span class="absolute top-2 left-2 z-1">{item}</span>}
        <img
          src={`${MONKEEZ_THUMBNAIL_URL_SMALL}/${item}.png`}
          // className="marquee-img"
          class="block aspect-square w-full max-w-[110px] sm:max-w-[150px] md:max-w-[170px] hover:cursor-pointer hover:opacity-80"
          alt={`Monkeez #${item}`}
        />
        {hovering && (
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span class="px-2 py-1 bg-mnkz-blue rounded-full border-solid border-black border-2">
              View
            </span>
          </div>
        )}
      </div>
    </a>
  );
}

export default function Carousel({ speed, direction, images }) {
  return (
    <>
      <div className="marquee-holder">
        <Marquee
          gradient={false}
          speed={25}
          direction={direction}
          pauseOnHover={true}
        >
          {images.map((item, index) => {
            return <CarouselImage item={item} key={index} />;
          })}
        </Marquee>
      </div>
    </>
  );
}
