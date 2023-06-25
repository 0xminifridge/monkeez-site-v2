import { useAccount } from "wagmi";
import { useConnectedAccount } from "../../../hooks/useAccount";
import { useCratez, useOpenCratez } from "../../../hooks/useCratez";
import LoadingSpinner from "../../LoadingSpinner";
import CratezItem from "./CratezItem";
import { useState } from "react";

export default function Cratez() {
  const connectedAccount = useAccount();
  const [selectedCrateIds, setSelectedCrateIds] = useState(() => new Set());

  const { data, isLoading } = useCratez(connectedAccount?.address);

  const { writeTx: openCratez, isMining } = useOpenCratez();

  const addCrate = (id) => {
    setSelectedCrateIds((prev) => new Set(prev).add(id));
  };

  const removeCrate = (id) => {
    setSelectedCrateIds((prev) => {
      const next = new Set(prev);

      next.delete(id);

      return next;
    });
  };

  const onClaimPressed = async () => {
    await openCratez(Array.from(selectedCrateIds));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div class="p-1 sm:py-5 justify-center flex">
      <div class="flex flex-col text-center ">
        <h1 class="m-auto text-[2.5rem] sm:text-[4rem] font-bold">Cratez</h1>
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/images/cratez/crate.png`}
            class="max-w-[500px] w-[250px] md:w-[100%] my-2 m-auto"
          />
        </div>
        {data?.length > 0 ? (
          <>
            <div class="h-full max-h-[30vh] bg-gray-200 overflow-y-auto m-2 rounded-xl p-4 border-4 border-black border-solid relative">
              <div class="grid grid-cols-3 md:grid-cols-5 ">
                {data?.map((id, index) => {
                  return (
                    <CratezItem
                      key={index}
                      id={id}
                      addCrate={addCrate}
                      removeCrate={removeCrate}
                    />
                  );
                })}
              </div>
              <span class="mb-2" />
            </div>
            <button
              onClick={() => onClaimPressed()}
              disabled={!selectedCrateIds?.size || isMining}
              class="m-auto text-lg rounded-xl border-4 border-solid border-black bg-mnkz-wobo w-48 px-4 py-2 enabled:hover:text-white hover:cursor-pointer hover:bg-mnkz-tan disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Claim {selectedCrateIds?.size || 0}
            </button>
          </>
        ) : (
          <div class="flex flex-col items-center justify-center bg-gray-300 my-1 rounded-lg">
            <img
              src={`${process.env.PUBLIC_URL}/images/logos/logo-black.png`}
              class="h-40 aspect-square"
            />
            <span>No items available</span>
          </div>
        )}
      </div>
    </div>
  );
}
