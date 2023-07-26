import { Link } from "react-router-dom";
import {
  firstSet,
  fifthSet,
  fourthSet,
  secondSet,
  thirdSet,
} from "../utils/collection-data";
import { useEffect } from "react";
import { MONKEEZ_THUMBNAIL_URL_SMALL } from "../utils/metadata";

export default function Landing() {
  async function preCacheImages(set) {
    for (const id of set) {
      const img = new Image();
      img.src = `${MONKEEZ_THUMBNAIL_URL_SMALL}/${id}.png`;
    }
  }

  useEffect(() => {
    preCacheImages(firstSet);
    preCacheImages(secondSet);
    preCacheImages(thirdSet);
    preCacheImages(fourthSet);
    preCacheImages(fifthSet);
  }, []);

  return (
    <>
      <div class="w-[100vw] h-[100vh] bg-[#72D1F2] overflow-hidden">
        <div class="flex justify-center items-center w-full h-full relative">
          <img src={`${process.env.PUBLIC_URL}/images/zungle-map.png`} />
          <div class="absolute z-10 left-0 right-0 mx-auto flex justify-center">
            <a
              href="/home"
              class="px-4 py-2 rounded-xl box-shadow-custom border-4 border-solid border-black bg-mnkz-tan hover:bg-black hover:text-white text-lg sm:text-2xl md:text-4xl"
            >
              <span class="animate-pulse hover:animate-none">
                Enter the Zungle
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
