import { useState } from "react";
import { ZUNGLE_LANDZ_IMAGE_URL } from "../../../utils/metadata";
import { useNavigate } from "react-router-dom";
import { LAND_MAPPINGS } from "../../../utils/collection-data";

export default function LandzCard({ item }) {
  const [hovering, setHovering] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      class={`${
        LAND_MAPPINGS[item?.biome?.toLowerCase()]
      } border-4 relative rounded-2xl border-solid border-black hover:border-mnkz-tan hover:cursor-pointer w-full shadow-2xl`}
      onClick={() => navigate(`/landz/${item?.id}`)}
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div class="inline-block overflow-hidden m-0 relative rounded-t-xl">
        <h3 class="absolute top-2 left-2 z-10 rounded-lg bg-gray-300/50 px-2 py-1 hidden sm:block">
          #{item?.id}
        </h3>
        <h3 class="absolute top-2 right-2 z-10 rounded-lg bg-gray-300/50 px-2 py-1 hidden sm:block">
          {item?.biome}
        </h3>
        <img
          class={`m-0 max-w-[300px] w-[100%] aspect-square transition-all duration-500 ${
            hovering ? "scale-110" : ""
          } block`}
          src={`${ZUNGLE_LANDZ_IMAGE_URL}/${item?.id}.png`}
        />
      </div>
      <div class="pb-5 px-5 flex flex-col">
        <div class="overflow-hidden">
          <span class="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
            Land #{item?.id}
          </span>
        </div>
        <div class="text-sm sm:text-lg">Level: 1</div>
        {/* <div>
          <div>
            <span>1</span>
            <img
              src={`${process.env.PUBLIC_URL}/images/resource-extractor.png`}
              class="w-10"
            />
          </div>
          <span class="align-center px-1">1: extractor</span>
        </div> */}
      </div>
    </div>
  );
}
