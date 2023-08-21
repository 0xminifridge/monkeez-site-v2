import { useEffect, useState } from "react";
import { useBuyPoster, usePosterSupply } from "../../../hooks/usePosterz";
export default function PosterCard({ item, mnkzBalance }) {
  const [isHovering, setIsHovering] = useState(false);

  const { writeTx, isMining } = useBuyPoster();
  const { data, isLoading, fetchData } = usePosterSupply(item?.id);

  useEffect(() => {
    const interval = setInterval(async () => {
      await fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      class={`${"bg-mnkz-tan"} bg-gray-900 border-4 relative rounded-2xl border-solid border-black hover:border-mnkz-tan hover:cursor-pointer w-full shadow-2xl`}
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div class="inline-block overflow-hidden m-0 relative rounded-t-xl">
        <h3 class="absolute top-2 left-2 z-10 rounded-lg bg-gray-300/50 px-2 py-1 hidden sm:block">
          #{item.id}
        </h3>
        <div class="absolute flex flex-row justify-center items-center top-2 right-2 mx-auto z-10 rounded-lg bg-gray-300/50 px-2 py-1 ">
          <img
            src={`${process.env.PUBLIC_URL}/images/mnkz-token.png`}
            class="w-6 aspect-square"
          />
          {item?.price}
        </div>
        {/* <h3 class="absolute bottom-2 left-0 right-0 z-10 flex flex-row justify-center rounded-lg bg-gray-300/50 text-black px-2 py-1 w-[80%] self-center mx-auto">
          {
            item?.attributes.filter((item) => item.trait_type === "Month")[0]
              ?.value
          }{" "}
          {
            item?.attributes.filter((item) => item.trait_type === "Year")[0]
              ?.value
          }
        </h3> */}
        <h3 class="absolute bottom-2 left-0 right-0 z-10 flex flex-row justify-center rounded-lg bg-gray-300/50 text-black px-2 py-1 w-[80%] self-center mx-auto">
          Supply: {data?.totalSupply || 0}
          {"/"}
          {data?.maxSupply || 0}
        </h3>

        <img
          class={`m-0 max-w-[300px] w-[100%]  aspect-square transition-all duration-500 ${
            isHovering ? "scale-110" : ""
          } block`}
          src={item?.img}
        />
      </div>
      <div class="pb-5 px-5 flex flex-col">
        <div class="overflow-hidden flex-col flex text-xs sm:text-sm md:text-xl lg:text-2xl 2xl:text-3xl">
          <span class=" font-bold  overflow-y-hidden">
            {
              item?.attributes.filter((item) => item.trait_type === "Month")[0]
                ?.value
            }{" "}
            {
              item?.attributes.filter((item) => item.trait_type === "Year")[0]
                ?.value
            }
          </span>
          <span class="text-xs sm:text-sm md:text-xl ">
            Artist:{" "}
            {
              item?.attributes.filter((item) => item.trait_type === "Artist")[0]
                ?.value
            }
          </span>
        </div>

        <div class="w-full h-full" onClick={(e) => e.stopPropagation()}>
          <button
            class="max-h-[48px] overflow-hidden bg-mnkz-wobo border-2 px-4 py-2 rounded-xl text-sm sm:text-lg hover:text-white hover:bg-gray-900 hover:cursor-pointer right-0 w-full disabled:bg-gray-300 disabled:text-light disabled:cursor-not-allowed disabled:hover:text-gray-400 box-shadow-custom"
            disabled={
              parseFloat(item?.price) > mnkzBalance ||
              data?.totalSupply === data?.maxSupply ||
              isLoading ||
              isMining
            }
            onClick={() => writeTx(item?.id, 1)}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
