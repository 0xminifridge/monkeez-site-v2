import { useState } from "react";
import { MONKEEZ_THUMBNAIL_URL_LG } from "../../utils/metadata";

export default function MonkeezTile({ item }) {
  const [hovering, setHovering] = useState(false);
  return (
    <a
      href={`/monkeez/${item.id}`}
      class="text-black"
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div class="text-black bg-[#231F20] flex flex-col justify-center text-center border-black hover:border-mnkz-tan border-4 border-solid rounded-xl overflow-hidden sf-rounding">
        <div class="overflow-hidden m-block relative">
          <span class="absolute top-2 left-2 z-10 rounded-lg bg-gray-300/50 px-2 py-1">
            #{item.id}
          </span>
          <span class="absolute top-2 right-2 z-10 rounded-lg bg-gray-300/50 px-2 py-1">
            {item.tribe}
          </span>
          <img
            src={`${MONKEEZ_THUMBNAIL_URL_LG}/${item.id}.png`}
            class={`block max-w-[500px] w-[100%] aspect-square transition-all duration-500 ${
              hovering ? "scale-110" : ""
            }`}
          />
        </div>
        <div
          class="flex flex-col justify-start text-left px-2 sm:px-6  text-white"
          onClick={(e) => e.stopPropagation()}
        >
          <a
            class="text-lg lg:text-2xl font-extrabold text-white hover:text-mnkz-tan"
            href="/collections"
          >
            Monkeez
          </a>
          <span class="text-lg lg:text-2xl text-gray-400">
            Monkeez #{item.id}
          </span>
        </div>
      </div>
    </a>
  );
}
