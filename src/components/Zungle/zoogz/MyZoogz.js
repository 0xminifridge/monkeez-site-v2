import { useAccount } from "wagmi";
import { useZoogz } from "../../../hooks/useZoogz";
import LoadingSpinner from "../../LoadingSpinner";
import ZoogzCard from "./ZoogzCard";
import { useEffect, useState } from "react";
import { ZOOG_STATS } from "../../../utils/collection-data";
import { useSelector, useDispatch } from "react-redux";
import ZoogFilter from "./ZoogzFilters";
import { setZoogz } from "../../../reducers/zoogzReducer";
import { ChevronDownIcon } from "../../icons/ChevronDown";

export default function MyZoogz() {
  const [buttonsOpen, setButtonsOpen] = useState(false);
  const connectedAccount = useAccount();
  const { data, isLoading, fetchData } = useZoogz(connectedAccount?.address);

  const zoogData = useSelector(
    (state) => state.zoogz[connectedAccount?.address?.toLowerCase()]
  );

  const dispatch = useDispatch();

  const filter = useSelector((state) => state.filters.zoogz.filter);
  const direction = useSelector((state) => state.filters.zoogz.direction);

  useEffect(() => {
    if (direction === "up") {
      const sortedList = [...data].sort(function (a, b) {
        return (
          parseFloat(a[filter?.toLowerCase()]) -
          parseFloat(b[filter?.toLowerCase()])
        );
      });
      dispatch(
        setZoogz({
          address: connectedAccount?.address?.toLowerCase(),
          items: sortedList,
        })
      );
    } else if (direction === "down") {
      const sortedList = [...data].sort(function (a, b) {
        return (
          parseFloat(b[filter?.toLowerCase()]) -
          parseFloat(a[filter?.toLowerCase()])
        );
      });
      dispatch(
        setZoogz({
          address: connectedAccount?.address?.toLowerCase(),
          items: sortedList,
        })
      );
    }
  }, [filter, direction]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div class="p-1 sm:py-5 justify-center flex">
      <div class="flex flex-col">
        <div class="flex flex-row m-auto justify-center items-center">
          <h1 class="m-auto text-[2.5rem] sm:text-[4rem] font-bold">
            My Zoogz
          </h1>
          <div
            class="hover:cursor-pointer hover:text-mnkz-tan"
            onClick={() => setButtonsOpen(!buttonsOpen)}
          >
            <ChevronDownIcon
              direction={buttonsOpen ? "up" : "down"}
              height={"50"}
              width={"50"}
            />
          </div>
        </div>
        {data?.length > 0 ? (
          <>
            <div
              class={`${
                buttonsOpen ? "" : "hidden"
              } flex flex-row justify-between items-center`}
            >
              {ZOOG_STATS.map((stat, index) => {
                return (
                  <ZoogFilter
                    key={index}
                    stat={stat}
                    filter={filter}
                    direction={direction}
                  />
                );
              })}
            </div>

            <div class="order-0 py-2 mb-2 grid auto-cols-max auto-rows-max grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 overflow-scroll h-[75vh] gap-4 m-auto border-0 border-b-4 border-t-4 border-black border-solid">
              {data?.map((item, index) => {
                return <ZoogzCard key={index} item={item} />;
              })}
            </div>
          </>
        ) : (
          <div class="flex flex-col items-center justify-center bg-gray-300 m-1 rounded-lg">
            <img
              src={`${process.env.PUBLIC_URL}/images/logos/logo-black.png`}
              class="max-h-[350px] h-full aspect-square"
            />
            <span>No items available</span>
          </div>
        )}
      </div>
    </div>
  );
}
