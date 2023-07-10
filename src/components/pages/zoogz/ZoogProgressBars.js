import { useState, useEffect } from "react";
import ZungleItemTile from "../../Zungle/shop/ZungleItemTile";
import {
  ZOOG_MAX_ITEMS_PER_DAY,
  ZOOG_STATS,
} from "../../../utils/collection-data";
import { TYPE_MAPPINGS } from "../../../utils/collection-data";
import ProgressBar from "../ProgessBar";
import { useZungleItems } from "../../../hooks/useItems";
import LoadingSpinner from "../../LoadingSpinner";
import { BackArrowLeft } from "../../icons/BackArrowLeft";
import { useUpgradeZoog } from "../../../hooks/useZoogz";
import { useDispatch } from "react-redux";
import { createError } from "../../../reducers/alertReducer";
import { XP_FOR_LEVELS } from "../../../utils/collection-data";
import CountdownTimer from "../../Zungle/CountdownTimer";
import { Tooltip } from "flowbite-react";

export default function ZoogProgressBars({
  data,
  isOwner,
  xpData,
  fetchZoog,
  fetchXpInfo,
}) {
  const [upgrading, setUpgrading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectable, setSelectable] = useState(true);
  const [maxAllowed, setMaxAllowed] = useState(ZOOG_MAX_ITEMS_PER_DAY);
  const [claimableIn, setClaimableIn] = useState(null);

  const { data: items, isLoading } = useZungleItems(data?.owner);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const { writeTx, isMining } = useUpgradeZoog();

  const dispatch = useDispatch();

  const backClicked = () => {
    setUpgrading("");
    setSelectedItems([]);
    // setTotalXp(0);
    // setSelectable(true);
  };

  const addItem = (item) => {
    if (selectable) {
      setSelectedItems([...selectedItems, item]);
    } else {
      dispatch(createError("Maximum items exceeded"));
    }
  };

  const removeItem = (index) => {
    setSelectedItems((prev) => prev.filter((item) => item.index !== index));
  };

  useEffect(() => {
    setSelectable(selectedItems?.length < maxAllowed);
  }, [selectedItems]);

  useEffect(() => {
    const now = new Date();
    const stakeDate = new Date(xpData?.lastUpgradedTs * 1000 + 8600);
    const claimableIn = Math.floor(Math.abs(now - stakeDate) / 36e5);
    setClaimableIn(claimableIn);
    if (claimableIn >= 24) {
      setMaxAllowed(ZOOG_MAX_ITEMS_PER_DAY);
    } else {
      setMaxAllowed(ZOOG_MAX_ITEMS_PER_DAY - xpData?.itemCount);
    }
  }, [xpData]);

  const upgradeClicked = async () => {
    let typeIds = selectedItems?.map((item) => item.id);

    let amounts = Array(typeIds?.length).fill(1);

    await writeTx(data?.id, upgrading, typeIds, amounts);

    await fetchZoog(data?.id);

    await fetchXpInfo(data?.id);

    setUpgrading("");
    setSelectedItems([]);
  };

  if (!xpData) {
    return null;
  }

  if (upgrading) {
    if (isLoading) {
      return (
        <div class="flex justify-center">
          <LoadingSpinner />;
        </div>
      );
    }
    if (
      !items?.filter((item) => item[upgrading?.toLowerCase()] === true)?.length
    ) {
      return (
        <div class="flex flex-col items-center justify-center bg-gray-300 my-1 rounded-lg">
          <img
            src={`${process.env.PUBLIC_URL}/images/logos/logo-black.png`}
            class="h-40 aspect-square"
          />
          <span>No items available</span>
          <div class="flex flex-row justify-center relative items-center w-full">
            <div
              class="hover:cursor-pointer absolute left-1 md:left-2 bottom-1 md:bottom-2"
              // onClick={() => setLevelPopup(false)}
              onClick={() => backClicked()}
            >
              <BackArrowLeft classes="rotate-180 self-start" />
            </div>
          </div>
        </div>
      );
    }
    return (
      <>
        <div class="flex flex-col justify-center">
          <div class="flex flex-row justify-between w-[100%] md:w-[80%] m-auto p-1 my-2 text-xs md:text-sm lg:text-lg text-center">
            {/* <span>Selected: {selectedItems?.length}</span> */}
            <span class="px-2 text-black bg-mnkz-tan box-shadow-custom rounded-lg border-2 border-solid border-black">
              Selected XP: {selectedItems.reduce((sum, obj) => sum + obj.xp, 0)}
            </span>
            {maxAllowed > 0 ? (
              <span class="px-2 text-black bg-mnkz-wobo box-shadow-custom rounded-lg border-2 border-solid border-black mx-2">
                Remaining: {maxAllowed - selectedItems?.length}
              </span>
            ) : (
              <span class="px-2 text-black bg-mnkz-red box-shadow-custom rounded-lg border-2 border-solid border-black mx-2">
                <CountdownTimer
                  epochTime={
                    xpData?.lastUpgradedTs * 1000 + 24 * 60 * 60 * 1000
                  }
                />
              </span>

              // <span class="px-1 text-mnkz-red">
              //   Next upgrade: {24 - claimableIn} hours
              // </span>
            )}
            <span class="text-black bg-mnkz-tan box-shadow-custom rounded-lg border-2 border-solid border-black">
              XP to {data[upgrading?.toLowerCase()] + 1}:{" "}
              {parseInt(data[upgrading?.toLowerCase()]) === 99
                ? 0
                : XP_FOR_LEVELS[data[upgrading?.toLowerCase()] + 1] -
                  xpData[`${upgrading?.toLowerCase()}Xp`]}{" "}
            </span>
          </div>
          <div class=" overflow-x-auto">
            <div
              class={`grid ${
                items?.length > 5 ? "grid-rows-2" : "grid-rows-1"
              } grid-flow-col gap-4`}
            >
              {items
                ?.filter((item) => item[upgrading?.toLowerCase()] === true)
                .map((item, index) => {
                  return (
                    <ZungleItemTile
                      key={index}
                      index={index}
                      item={item}
                      addItem={addItem}
                      removeItem={removeItem}
                      selectable={selectable}
                    />
                  );
                })}
            </div>
          </div>
          <div class="pt-4 pb-2 flex flex-row justify-center relative items-center w-full">
            <div
              class="hover:cursor-pointer absolute left-0 md:left-2 "
              // onClick={() => setLevelPopup(false)}
              onClick={() => backClicked()}
            >
              <BackArrowLeft classes="rotate-180 self-start" />
            </div>
            {xpData?.initialized && (
              <button
                class={`${
                  TYPE_MAPPINGS[data?.type?.toLowerCase()]
                } bottom-6 hover:bg-mnkz-tan w-70 border-4 ml-2 px-4 py-2 rounded-xl text-lg hover:text-white hover:cursor-pointer right-0 disabled:bg-gray-300 disabled:text-light disabled:cursor-default disabled:hover:text-gray-400`}
                // disabled={transactionProcessing || selectedItems.length === 0}
                // onClick={() => upgradeStat()}
                onClick={() => upgradeClicked()}
                disabled={isMining || !selectedItems.length || !maxAllowed}
              >
                Upgrade: {upgrading?.toLocaleUpperCase()}
              </button>
            )}
            {!xpData?.initialized && (
              <button
                class={`${
                  TYPE_MAPPINGS[data?.type?.toLowerCase()]
                } bottom-6 hover:bg-mnkz-tan w-70 border-4 ml-2 px-4 py-2 rounded-xl text-lg hover:text-white hover:cursor-pointer right-0 disabled:bg-gray-300 disabled:text-light disabled:cursor-default disabled:hover:text-gray-400`}
                // disabled={transactionProcessing}
                // onClick={() => initializeZoog()}
              >
                Initialize
              </button>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        {ZOOG_STATS.map((stat, index) => {
          return (
            <div key={index}>
              <div class="flex items-center justify-center">
                <h2 class="text-sm sm:text-xl my-1">
                  {stat?.toUpperCase()} : {data[stat?.toLowerCase()]}
                </h2>
              </div>
              <div class="w-full h-[4vh] flex flex-row justify-center items-center m-auto">
                <img
                  src={`${process.env.PUBLIC_URL}/images/zoogz/stats/${stat}.png`}
                  class="w-6 sm:w-8 mr-3"
                />
                <ProgressBar
                  bgColor={TYPE_MAPPINGS[data?.type?.toLowerCase()] || "#000"}
                  xpPoints={xpData[`${stat?.toLowerCase()}Xp`]}
                  level={data[stat?.toLowerCase()]}
                  style={{ width: "100%" }}
                />
                <Tooltip content={`Level ${stat?.toLowerCase()}`}>
                  <button
                    class={`${isOwner ? "visible" : "hidden"} ${
                      TYPE_MAPPINGS[data?.type?.toLowerCase()]
                    } ml-3 h-8 px-3 py-1 rounded-lg text-sm sm:text-xl font-bold hover:bg-mnkz-tan hover:cursor-pointer hover:text-white box-shadow-custom`}
                    onClick={() => setUpgrading(stat?.toLowerCase())}
                    disabled={isMining}
                  >
                    +
                  </button>
                </Tooltip>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}
