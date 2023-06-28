import { useAccount } from "wagmi";
import {
  useMonkeezForAddress,
  useStakeMonkeez,
  useUnstakeMonkeez,
} from "../../../hooks/useMonkeez";
import LoadingSpinner from "../../LoadingSpinner";
import MonkeezCard from "./MonkeezCard";
import { ChevronDownIcon } from "../../icons/ChevronDown";
import { useState } from "react";

export default function MyMonkeez() {
  const connectedAccount = useAccount();
  const [buttonsOpen, setButtonsOpen] = useState(false);
  const { monkeez, isLoading } = useMonkeezForAddress(
    connectedAccount?.address
  );

  const { writeTx: stakeMonkeez, isMining: stakeMining } = useStakeMonkeez();

  const { writeTx: unstakeMonkeez, isMining: unstakeMining } =
    useUnstakeMonkeez();

  const stakeAll = async () => {
    const monkeezIds = monkeez
      ?.filter((obj) => obj.staked === false)
      ?.map(function (item) {
        return item.id;
      });
    if (monkeezIds.length > 0) {
      await stakeMonkeez(monkeezIds);
    }
  };

  const unstakeAll = async () => {
    const monkeezIds = monkeez
      ?.filter((obj) => obj.staked === true)
      ?.map(function (item) {
        return item.id;
      });
    if (monkeezIds.length > 0) {
      await unstakeMonkeez(monkeezIds);
    }
  };

  if (isLoading && !monkeez?.length) {
    return <LoadingSpinner />;
  }

  return (
    <div class="p-1 sm:py-5 justify-center flex">
      <div class="flex flex-col">
        <div class="flex flex-row m-auto justify-center items-center">
          <h1 class="m-auto text-[2.5rem] sm:text-[4rem] font-bold">
            My Monkeez
          </h1>
          <div
            class="hover:cursor-pointer hover:text-mnkz-tan"
            onClick={() => setButtonsOpen(!buttonsOpen)}
          >
            <ChevronDownIcon direction={buttonsOpen ? "up" : "down"} />
          </div>
        </div>

        <div
          class={`${
            buttonsOpen ? "" : "hidden"
          } flex flex-row justiy-center items-center m-auto`}
        >
          <button
            class="border-4 border-solid border-black bg-mnkz-wobo text-xs sm:text-sm md:text-lg hover:text-white hover:bg-mnkz-tan rounded-xl px-4 py-2 mr-2 box-shadow-custom mb-2 disabled:hover:cursor-default disabled:bg-gray-300 disabled:text-gray-400"
            disabled={
              stakeMining ||
              unstakeMining ||
              !monkeez?.filter((obj) => obj.staked === false)?.length
            }
            onClick={() => stakeAll()}
          >
            Stake All
          </button>
          <button
            class="border-4 border-solid border-black bg-mnkz-red text-xs sm:text-sm md:text-lg hover:text-white hover:bg-mnkz-tan rounded-xl px-4 py-2 ml-2 box-shadow-custom mb-2 disabled:hover:cursor-default disabled:bg-gray-300 disabled:text-gray-400"
            disabled={
              stakeMining ||
              unstakeMining ||
              !monkeez?.filter((obj) => obj.staked === true)?.length
            }
            onClick={() => unstakeAll()}
          >
            Unstake All
          </button>
        </div>

        {monkeez?.length > 0 ? (
          <div class="py-2 mb-2 grid auto-cols-max grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 overflow-y-auto h-[77vh] gap-4 m-auto border-0 border-b-4 border-t-4 border-black border-solid">
            {monkeez?.map((item, index) => {
              return <MonkeezCard key={index} item={item} />;
            })}
          </div>
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
