import { useState, useEffect } from "react";
import { useBattleHistory } from "../../../../hooks/useBattles";
import { BattleLogWinItem, BattleLogDrawItem } from "./BattleHistoryItem";
import LoadingSpinner from "../../../LoadingSpinner";

export default function BattleHistory() {
  const { data, lastId, isLoading, fetchAndSet, fetchAndAdd } =
    useBattleHistory();

  console.log("data:", data);

  const handleScroll = (e) => {
    const bottom =
      parseInt(e.target.scrollHeight - e.target.scrollTop) ===
      e.target.clientHeight;
    if (bottom && !isLoading) {
      fetchAndAdd(lastId);
    }
  };

  useEffect(() => {
    fetchAndSet(null);
  }, []);

  return (
    <div
      class="overflow-y-auto h-[72vh] border-0 border-b-2 md:border-b-4 border-solid border-black"
      onScroll={(event) => handleScroll(event)}
    >
      {/* {data?.length > 0 ? ( */}
      <>
        {data?.map((item, index) => {
          if (item?.result === "win") {
            let opponentId =
              item.zoogId === item?.winnerId ? item?.acceptingId : item?.zoogId;

            return (
              <BattleLogWinItem
                key={index}
                item={item}
                opponentId={opponentId}
              />
            );
          } else if (item?.result === "draw") {
            return <BattleLogDrawItem key={index} item={item} />;
          }
        })}
        {isLoading && (
          <div class="flex justify-center items-center">
            <LoadingSpinner />
          </div>
        )}
      </>
      {/* ) : (
        <div class="flex flex-col items-center justify-center bg-gray-300 my-1 rounded-lg w-full max-w-[500px] m-auto">
          <img
            src={`${process.env.PUBLIC_URL}/images/logos/logo-black.png`}
            class="h-40 aspect-square"
          />
          <span>No items available</span>
        </div>
      )} */}
    </div>
  );
}
