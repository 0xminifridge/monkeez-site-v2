import {
  useSortedZoogz,
  useZoogzLeaderboard,
} from "../../../../hooks/useZoogz";
import MagnifyingGlassIcon from "../../../icons/MagnifyingGlassIcon";
import LeaderboardFilters from "./LeaderboardFilters";
import { useState, useEffect } from "react";
import ZoogzLeaderboardItem from "./ZoogzLeaderboardItem";
import LoadingSpinner from "../../../LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import {
  replaceAll,
  setDirection,
  setFilterStat,
  setSnapshot,
} from "../../../../reducers/zoogzLeaderboardReducer";

export default function ZoogzLeaderboard({}) {
  const stats = [
    "totalLevel",
    "aggression",
    "toughness",
    "smarts",
    "vitality",
    "wins",
  ];

  const { data, isLoading, fetchData } = useZoogzLeaderboard();

  const direction = useSelector((state) => state.zoogzLeaderboard.direction);
  const filterStat = useSelector((state) => state.zoogzLeaderboard.filterStat);

  const lastId = useSelector((state) => state.zoogzLeaderboard.lastVisibleId);

  const dispatch = useDispatch();

  const changeDirection = (payload) => {
    dispatch(setDirection(payload));
  };

  const changeFilterStat = (payload) => {
    dispatch(setFilterStat(payload));
  };

  const handleScroll = (e) => {
    const bottom =
      parseInt(e.target.scrollHeight - e.target.scrollTop) ===
      e.target.clientHeight;
    if (bottom) {
      fetchData(lastId);
    }
  };

  return (
    <>
      <div class="flex flex-col justify-between md:w-full md:m-auto border-0 border-b-2 border-black border-solid">
        <div class="flex flex-row justify-between border-0 border-b-2 border-solid border-black">
          <div class="flex flex-row items-center justify-center ">
            <MagnifyingGlassIcon />
            <input
              type="text"
              class="w-[75px] md:w-[120px] h-[20px] py-1 px-2 xl:px-6 xl:py-1 outline-0 border-0 border-black rounded-lg focus:ring-0 focus:border-0"
              placeholder="zoog id"
              // value={filterId}
              // onChange={(event) => handleUserInput(event)}
            />
          </div>
          {stats.map((stat, index) => {
            return (
              <LeaderboardFilters
                key={index}
                stat={stat}
                filterStat={filterStat}
                setFilterStat={changeFilterStat}
                setDirection={changeDirection}
                direction={direction}
              />
            );
          })}
        </div>

        <div class="overflow-y-auto h-[65vh]" onScroll={(e) => handleScroll(e)}>
          {data?.map((item, index) => {
            if (item) {
              return <ZoogzLeaderboardItem key={index} item={item} />;
            }
          })}
          {isLoading && (
            <div class="flex justify-center items-center">
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
