import { useState, useEffect } from "react";
import { TYPE_MAPPINGS, ZOOG_STATS } from "../../../utils/collection-data";
import { useNavigate } from "react-router-dom";
import { ZOOGZ_THUMBNAIL_URL_LG } from "../../../utils/metadata";
import CountdownTimer from "../CountdownTimer";

export default function ZoogzCard({ item }) {
  const [hovering, setHovering] = useState(false);
  const [daysToReset, setDaysToReset] = useState(null);

  useEffect(() => {
    const now = new Date();
    const resetData = new Date(item?.energyTs * 1000);

    setDaysToReset(Math.floor(Math.abs(now - resetData) / 8.64e7));
  }, [item?.energyTs]);

  const navigate = useNavigate();

  return (
    <div
      class={`${
        TYPE_MAPPINGS[item?.type?.toLowerCase()]
      } bg-gray-900 border-4 relative rounded-2xl border-solid border-black hover:border-mnkz-tan hover:cursor-pointer w-full shadow-2xl`}
      onClick={() => navigate(`/zoogz/${item?.id}`)}
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div class="inline-block overflow-hidden m-0 relative rounded-t-xl">
        <h3 class="absolute top-2 left-2 z-10 rounded-lg bg-gray-300/50 px-2 py-1 hidden sm:block">
          #{item?.id}
        </h3>
        <h3 class="absolute top-2 right-2 z-10 rounded-lg bg-gray-300/50 px-2 py-1 hidden sm:block">
          {item?.type}
        </h3>
        <div class="absolute bottom-2 left-2 z-10 rounded-lg bg-gray-300/50 md:text-xl px-2 py-1">
          <div class="flex flex-row justify-center items-center">
            <img
              src={`${process.env.PUBLIC_URL}/images/zoogz/stats/energy.png`}
              class="w-5"
            />
            {item?.energy > 0 ? (
              <span>{item?.energy}</span>
            ) : (
              <>
                {daysToReset < 1 ? (
                  <CountdownTimer
                    epochTime={item?.energyTs * 1000 + 24 * 60 * 60 * 1000}
                  />
                ) : (
                  <CountdownTimer
                    epochTime={
                      item?.energyTs * 1000 +
                      24 * 60 * 60 * 1000 * (daysToReset + 1)
                    }
                  />
                )}
              </>
            )}
          </div>
        </div>
        <div
          class={`absolute bottom-2 left-0 right-0 z-10 flex flex-row justify-center rounded-lg bg-gray-300/80 text-black px-2 py-1 w-[80%] self-center mx-auto ${
            hovering && item?.energy > 0 && item?.energy < 10
              ? "flex"
              : "hidden"
          }`}
        >
          {daysToReset < 1 ? (
            <CountdownTimer
              epochTime={item?.energyTs * 1000 + 24 * 60 * 60 * 1000}
            />
          ) : (
            <CountdownTimer
              epochTime={
                item?.energyTs * 1000 + 24 * 60 * 60 * 1000 * (daysToReset + 1)
              }
            />
          )}
        </div>
        <img
          class={`m-0 max-w-[300px] w-[100%] aspect-square transition-all duration-500 ${
            hovering ? "scale-110" : ""
          } block`}
          src={`${ZOOGZ_THUMBNAIL_URL_LG}/${item?.id}.png`}
        />
      </div>
      <div class="pb-5 px-5 flex flex-col">
        <div class="overflow-hidden">
          <span class="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
            Zoog #{item?.id}
          </span>
        </div>
        <div class="grid grid-cols-2 gap-1">
          {ZOOG_STATS.map((stat, index) => {
            return (
              <div key={index} class="flex flex-row justify-start items-center">
                <img
                  src={`${
                    process.env.PUBLIC_URL
                  }/images/zoogz/stats/${stat?.toLowerCase()}.png`}
                  class="w-full max-w-[25px]"
                />
                <span class="align-center px-1">
                  {item[stat?.toLowerCase()]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
