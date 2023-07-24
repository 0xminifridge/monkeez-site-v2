import { useAccount } from "wagmi";
import {
  useActiveBattles,
  useCancelBattle,
} from "../../../../hooks/useBattles";
import ActiveBattleItem from "./ActiveBattleItem";
import { useState, useEffect } from "react";
import LoadingSpinner from "../../../LoadingSpinner";

export default function ActiveBattles({ clickActiveInstance, setCreateOpen }) {
  const { data, isLoading, fetchAndSet, fetchAndAdd } = useActiveBattles();
  const [firstRender, setFirstRender] = useState(false);

  const connectedAccount = useAccount();

  const { writeTx: cancelBattle, isMining } = useCancelBattle();

  const fetchFirst = async () => {
    await fetchAndSet(null);
    setFirstRender(true);
  };

  useEffect(() => {
    fetchFirst();
  }, []);

  const cancelClicked = async (id) => {
    await cancelBattle(id);
    await fetchAndSet(null);
  };

  if (isLoading) {
    return (
      <div class="flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div
      class="overflow-y-auto h-[70vh] border-0 border-b-2 md:border-b-4 border-solid border-black"
      //   onScroll={(event) => handleScroll(event, getZScoreLeaderboard)}
    >
      {data?.length > 0 ? (
        <>
          {data?.map((item, index) => {
            return (
              <ActiveBattleItem
                key={index}
                item={item}
                account={connectedAccount?.address}
                cancelBattle={cancelClicked}
                clickActiveInstance={clickActiveInstance}
              />
            );
          })}
        </>
      ) : (
        <div class="flex flex-col items-center justify-center bg-gray-300 my-1 rounded-lg w-full max-w-[500px] m-auto">
          <img
            src={`${process.env.PUBLIC_URL}/images/logos/logo-black.png`}
            class="h-40 aspect-square"
          />
          <span>No active battlez</span>
          <button
            class="border-2 border-black border-solid bg-mnkz-wobo px-4 py-2 my-2 rounded-xl hover:bg-mnkz-tan hover:text-white box-shadow-custom disabled:bg-gray-300 disabled:text-gray-400 duration-150 transition"
            onClick={() => setCreateOpen(true)}
          >
            Start one now
          </button>
        </div>
      )}
    </div>
  );
}
