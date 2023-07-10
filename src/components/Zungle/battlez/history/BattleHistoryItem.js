import { ZOOGZ_THUMBNAIL_URL_LG } from "../../../../utils/metadata";
import { Link } from "react-router-dom";

export function BattleLogWinItem({ item, opponentId }) {
  return (
    <div
      class={`my-2 md:my-4 bg-gray-200 hover:bg-gray-300 hover:cursor-pointer relative flex flex-row items-center justify-between pr-2 px-4 md:px-4 py-2 rounded-xl border-black border-4 border-solid text-start`}
    >
      <div class="absolute top-1 left-1 md:top-2 md:left-2 flex flex-col justify-center w-5">
        <span class="text-xs ">{item?.id}</span>
        {item?.isVRF && (
          <img
            src={`${process.env.PUBLIC_URL}/images/icons/link.png`}
            class="w-5"
          />
        )}
      </div>

      <div class="ml-4 md:ml-5 flex flex-row justify-center items-center">
        <Link to={`/zoogz/${item?.winnerId}`} target="_blank">
          <div class="relative text-black flex items-center hover:opacity-80">
            <span class="hidden lg:block absolute top-2 left-2 z-10 rounded-lg bg-gray-300/50 px-2 py-1">
              #{item?.winnerId}
            </span>
            <img
              src={`${ZOOGZ_THUMBNAIL_URL_LG}/${item?.winnerId}.png`}
              class="w-10 sm:w-16 md:w-24 lg:w-40 rounded-full md:rounded-lg lg:rounded-xl"
            />
          </div>
        </Link>

        <div class="flex flex-col justify-center items-center mx-2 md:mx-4">
          <img
            src={`${process.env.PUBLIC_URL}/images/zoogz/stats/aggression.png`}
            class="w-5 md:w-10"
          />
          <span class="text-sm md:text-lg px-1 md:px-5">Won against</span>
        </div>
        <Link to={`/zoogz/${opponentId}`} target="_blank">
          <div class="relative text-black flex items-center hover:opacity-80">
            <span class="hidden lg:block absolute top-2 left-2 z-10 rounded-lg bg-gray-300/50 px-2 py-1">
              #{opponentId}
            </span>
            <img
              src={`${ZOOGZ_THUMBNAIL_URL_LG}/${opponentId}.png`}
              class="w-10 sm:w-16 md:w-24 lg:w-40 rounded-full md:rounded-lg lg:rounded-xl"
            />
          </div>
        </Link>
      </div>
      <div class="flex flex-row justify-center items-center bg-mnkz-wobo px-1 md:px-2 py-1 rounded-lg border-black border-2 border-solid box-shadow-custom">
        <span class="text-black">+{item?.tokenAmt}</span>
        <img
          src={`${process.env.PUBLIC_URL}/images/mnkz-token.png`}
          class="w-5"
        />
      </div>
    </div>
  );
}

export function BattleLogDrawItem({ item }) {
  return (
    <>
      <div
        class={`my-2 md:my-4 bg-gray-200 hover:bg-gray-300 hover:cursor-pointer relative flex flex-row items-center justify-between pr-2 px-4 md:px-4 py-2 rounded-xl border-black border-4 border-solid text-start`}
      >
        <div class="absolute top-1 left-1 md:top-2 md:left-2 flex flex-col justify-center w-5">
          <span class="text-xs ">{item?.id}</span>
          {item?.isVRF && (
            <img
              src={`${process.env.PUBLIC_URL}/images/icons/link.png`}
              class="w-5"
            />
          )}
        </div>

        <div class="ml-4 md:ml-5 flex flex-row justify-center items-center">
          <Link to={`/zoogz/${item?.zoogId}`} target="_blank">
            <div class="relative text-black flex items-center hover:opacity-80">
              <span class="hidden lg:block absolute top-2 left-2 z-10 rounded-lg bg-gray-300/50 px-2 py-1">
                #{item.zoogId}
              </span>
              <img
                src={`${ZOOGZ_THUMBNAIL_URL_LG}/${item?.zoogId}.png`}
                class="w-10 sm:w-16 md:w-24 lg:w-40 rounded-full md:rounded-lg lg:rounded-xl"
              />
            </div>
          </Link>
          <div class="flex flex-col justify-center items-center mx-2 md:mx-4">
            <img
              src={`${process.env.PUBLIC_URL}/images/zoogz/stats/sword-n-shield.png`}
              class="w-5 md:w-10"
            />
            <span class="text-sm md:text-lg px-1 md:px-5">Tied against</span>
          </div>

          <Link to={`/zoogz/${item?.acceptingId}`} target="_blank">
            <div class="relative text-black flex items-center hover:opacity-80">
              <span class="hidden lg:block absolute top-2 left-2 z-10 rounded-lg bg-gray-300/50 px-2 py-1">
                #{item.acceptingId}
              </span>
              <img
                src={`${ZOOGZ_THUMBNAIL_URL_LG}/${item?.acceptingId}.png`}
                class="w-10 sm:w-16 md:w-24 lg:w-40 rounded-full md:rounded-lg lg:rounded-xl"
              />
            </div>
          </Link>
        </div>
        <div class="flex flex-row justify-center items-center bg-mnkz-tan px-1 md:px-2 py-1 rounded-lg border-black border-2 border-solid box-shadow-custom">
          <span class="text-black">{item?.tokenAmt}</span>
          <img
            src={`${process.env.PUBLIC_URL}/images/mnkz-token.png`}
            class="w-5"
          />
        </div>
      </div>
    </>
  );
}
