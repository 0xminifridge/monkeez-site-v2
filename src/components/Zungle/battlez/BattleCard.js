import { ZOOG_STATS } from "../../../utils/collection-data";
import { ZOOGZ_THUMBNAIL_URL_LG } from "../../../utils/metadata";

export default function BattleCard({ zoog }) {
  return (
    <div
      class={`overflow-hidden relative block border-gray-800 border-solid border-4 rounded-xl `}
    >
      <span class="absolute md:text-sm top-1 left-1 bg-gray-300/50 rounded-lg px-2 py-1">
        {zoog?.id}
      </span>
      <div class="absolute top-1 right-1 bg-gray-300/50 rounded-lg px-2 py-1 flex flex-row justify-center items-center">
        <span>{zoog?.type}</span>
      </div>

      <img
        src={`${ZOOGZ_THUMBNAIL_URL_LG}/${zoog?.id}.png`}
        class="w-full max-w-[200px] min-w-[100px] aspect-square"
      />
      <div class="flex flex-row justify-between items-center px-2 py-1 md:px-4 md:py-2 bg-black text-white">
        {ZOOG_STATS?.map((stat, index) => {
          return (
            <div key={index} class="flex flex-col">
              <span>{zoog[stat?.toLowerCase()]}</span>
              <img
                src={`${
                  process.env.PUBLIC_URL
                }/images/zoogz/stats/${stat?.toLowerCase()}.png`}
                class="w-4 h-4 aspect-square"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
