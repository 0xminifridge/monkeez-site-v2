import { TYPE_MAPPINGS } from "../../../utils/collection-data";
import { ChevronDownIcon } from "../../icons/ChevronDown";
import { useRef, useState } from "react";
import { ZOOGZ_THUMBNAIL_URL_SMALL } from "../../../utils/metadata";

export default function ZoogBattleHistory({
  tribe,
  defaultOpen,
  battleData,
  zoogId,
}) {
  const [historyOpen, setHistoryOpen] = useState(defaultOpen);

  const historyRef = useRef(null);

  return (
    <>
      <div
        class={`${
          TYPE_MAPPINGS[tribe?.toLowerCase()]
        } max-h-[400px] overflow-y-auto flex flex-col border-black border-solid border-4 rounded-lg p-4 my-2 md:my-4 overflow-hidden box-shadow-custom`}
      >
        <div
          class="flex flex-row justify-between items-center py-2  hover:cursor-pointer"
          onClick={() => setHistoryOpen(!historyOpen)}
        >
          <p class="font-semibold">Battle History</p>
          <div class="flex flex-row items-center">
            <div>
              <p>{battleData?.length}</p>
            </div>
            <ChevronDownIcon direction={historyOpen ? "up" : "down"} />
          </div>
        </div>
        <div
          class={`grid grid-cols-1 gap-4 ${historyOpen ? "" : "hidden"}`}
          ref={historyRef}
        >
          {battleData
            ?.sort(function (a, b) {
              return parseFloat(b.id) - parseFloat(a.id);
            })
            .map((item, index) => {
              if (item.result === "win" && item.winnerId === parseInt(zoogId)) {
                let opponentId =
                  item.zoogId === parseInt(zoogId)
                    ? item.acceptingId
                    : item.zoogId;
                return (
                  <BattleWinHistoryItem
                    key={index}
                    item={item}
                    opponentId={opponentId}
                  />
                );
              } else if (
                item.result === "win" &&
                item.winnerId !== parseInt(zoogId)
              ) {
                return (
                  <BattleLossHistoryItem
                    key={index}
                    item={item}
                    opponentId={item.winnerId}
                  />
                );
              } else if (item.result === "draw") {
                let opponentId =
                  item.zoogId === parseInt(zoogId)
                    ? item.acceptingId
                    : item.zoogId;
                return (
                  <BattleDrawHistoryItem
                    key={index}
                    item={item}
                    opponentId={opponentId}
                  />
                );
              }
            })}
        </div>
      </div>
    </>
  );
}

export function BattleDrawHistoryItem({ item, opponentId }) {
  return (
    <>
      <div
        class={`bg-white relative flex flex-row items-center justify-between px-4 py-2 rounded-lg border-black border-2 border-solid text-start`}
      >
        <span class="text-xs absolute top-1 left-1 md:top-2 md:left-2">
          {item.id}
        </span>

        <div class="ml-3 md:ml-4 flex flex-row justify-center items-center">
          <img
            src={`${process.env.PUBLIC_URL}/images/zoogz/stats/sword-n-shield.png`}
            class="w-10"
          />
          <span class="text-sm md:text-lg px-1 md:px-5">Tied against</span>
          <a href={`/zoogz/${opponentId}`}>
            {" "}
            <img
              src={`${ZOOGZ_THUMBNAIL_URL_SMALL}/${opponentId}.png`}
              class="w-10 rounded-full mr-2 hover:opacity-80"
            />
          </a>
        </div>
        <div class="flex flex-row justify-center items-center bg-mnkz-tan mx-2 px-1 md:px-2 py-1 rounded-lg border-black border-2 border-solid box-shadow-custom text-xs sm:text-sm">
          <span class="text-black">{item.tokenAmt}</span>
          <img
            src={`${process.env.PUBLIC_URL}/images/mnkz-token.png`}
            class="w-5"
          />
        </div>
      </div>
    </>
  );
}

export function BattleLossHistoryItem({ item, opponentId }) {
  return (
    <>
      <div
        class={`bg-white relative flex flex-row items-center justify-between px-4 py-2 rounded-lg border-black border-2 border-solid text-start`}
      >
        <span class="text-xs absolute top-1 left-1 md:top-2 md:left-2">
          {item.id}
        </span>

        <div class="ml-3 md:ml-4 flex flex-row justify-center items-center">
          <img
            src={`${process.env.PUBLIC_URL}/images/zoogz/stats/toughness.png`}
            class="w-10"
          />
          <span class="text-sm md:text-lg px-1 md:px-5">Lost against</span>
          <a href={`/zoogz/${opponentId}`}>
            <img
              src={`${ZOOGZ_THUMBNAIL_URL_SMALL}/${opponentId}.png`}
              class="w-10 rounded-full mr-2 hover:opacity-80"
            />
          </a>
        </div>
        <div class="flex flex-row justify-center items-center bg-mnkz-red mx-2 px-1 md:px-2 py-1 rounded-lg border-black border-2 border-solid box-shadow-custom text-xs sm:text-sm">
          <span class="text-black">-{item.tokenAmt}</span>
          <img
            src={`${process.env.PUBLIC_URL}/images/mnkz-token.png`}
            class="w-5"
          />
        </div>
      </div>
    </>
  );
}

export function BattleWinHistoryItem({ item, opponentId }) {
  return (
    <>
      <div
        class={`bg-white relative flex flex-row items-center justify-between px-4 py-2 rounded-lg border-black border-2 border-solid text-start`}
      >
        <span class="text-xs absolute top-1 left-1 md:top-2 md:left-2">
          {item.id}
        </span>

        <div class="ml-3 md:ml-4 flex flex-row justify-center items-center">
          <img
            src={`${process.env.PUBLIC_URL}/images/zoogz/stats/aggression.png`}
            class="w-10"
          />
          <span class="text-sm md:text-lg px-1 md:px-5">Won against</span>
          <a href={`/zoogz/${opponentId}`}>
            <img
              src={`${ZOOGZ_THUMBNAIL_URL_SMALL}/${opponentId}.png`}
              class="w-10 rounded-full mr-2 hover:opacity-80"
            />
          </a>
        </div>
        <div class="flex flex-row justify-center items-center bg-mnkz-wobo mx-2 px-1 md:px-2 py-1 rounded-lg border-black border-2 border-solid box-shadow-custom text-xs sm:text-sm">
          <span class="text-black">+{item.tokenAmt * 0.98}</span>
          <img
            src={`${process.env.PUBLIC_URL}/images/mnkz-token.png`}
            class="w-5"
          />
        </div>
      </div>
    </>
  );
}
