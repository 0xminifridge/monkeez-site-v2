import {
  useSortedZoogz,
  useZoogzLeaderboard,
} from "../../../../hooks/useZoogz";
import MagnifyingGlassIcon from "../../../icons/MagnifyingGlassIcon";
import LeaderboardFilters from "./LeaderboardFilters";
import { useState, useEffect, useRef } from "react";
import ZoogzLeaderboardItem from "./ZoogzLeaderboardItem";
import LoadingSpinner from "../../../LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import {
  replaceAll,
  setDirection,
  setFilterStat,
  setSnapshot,
  setItems,
  clearLastId,
  addItems,
  setLastId,
} from "../../../../reducers/zoogzLeaderboardReducer";
import {
  getZoogForId,
  queryZoogLeaderboardAscending,
  queryZoogLeaderboardDescending,
} from "../../../../utils/firebase";

export default function ZoogzLeaderboard({}) {
  const stats = [
    "totalLevel",
    "aggression",
    "toughness",
    "smarts",
    "vitality",
    "wins",
  ];

  const containerRef = useRef(null);

  // const [direction, setDirection] = useState("down");
  // const [filterStat, setFilterStat] = useState("wins");
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [lastId, setLastId] = useState(null);
  // const [endReached, setEndReached] = useState(false);

  const [firstRender, setFirstRender] = useState(false);
  const [searchedZoogId, setSearchedZoogId] = useState(null);
  const [singleRecord, setSingleRecord] = useState(null);

  const data = useSelector((state) => state.zoogzLeaderboard.items);

  const { isLoading, endReached, fetchAndAdd, fetchAndSet } =
    useZoogzLeaderboard();

  const direction = useSelector((state) => state.zoogzLeaderboard.direction);
  const filterStat = useSelector((state) => state.zoogzLeaderboard.filterStat);

  const lastId = useSelector((state) => state.zoogzLeaderboard.lastVisibleId);

  const hasFetched = useSelector((state) => state.zoogzLeaderboard.hasFetched);

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
    if (bottom && !isLoading) {
      fetchAndAdd(lastId);
    }
  };

  const processFirstRender = async () => {
    await fetchAndAdd();
    setFirstRender(true);
  };

  useEffect(() => {
    if (firstRender) {
      fetchAndSet(null);
    }

    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [direction, filterStat]);

  useState(() => {
    if (data?.length === 0 && !hasFetched) {
      processFirstRender();
    } else {
      setFirstRender(true);
    }
  }, []);

  const handleUserInput = async (e) => {
    let targetId = e.target.value;
    console.log("targetId", targetId);
    setSearchedZoogId(targetId);
  };

  useEffect(() => {
    const fetchZoog = async () => {
      if (searchedZoogId) {
        const zoogItem = await getZoogForId(searchedZoogId);
        if (zoogItem) {
          setSingleRecord(zoogItem);
        }
      } else {
        setSingleRecord(null);
      }
    };
    fetchZoog();
  }, [searchedZoogId]);

  return (
    <>
      <div class="flex flex-col justify-between md:w-full md:m-auto border-0 border-b-4 border-black border-solid">
        <div class="flex flex-row justify-between border-0 border-b-4 border-solid border-black">
          <div class="flex flex-row items-center justify-center ">
            <MagnifyingGlassIcon />
            <input
              type="text"
              class="w-[75px] md:w-[120px] h-[20px] py-1 px-2 xl:px-6 xl:py-1 outline-0 border-0 border-black rounded-lg focus:ring-0 focus:border-0"
              placeholder="zoog id"
              // value={filterId}
              onChange={(event) => handleUserInput(event)}
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

        <div
          class="overflow-y-auto h-[65vh]"
          onScroll={(e) => handleScroll(e)}
          ref={containerRef}
        >
          {singleRecord && <ZoogzLeaderboardItem item={singleRecord} />}
          {!singleRecord &&
            data?.map((item, index) => {
              if (item) {
                return (
                  <ZoogzLeaderboardItem key={index} item={item} index={index} />
                );
              }
            })}
          {isLoading && !endReached && (
            <div class="flex justify-center items-center">
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
