import { useState, useEffect } from "react";
import ActiveBattles from "./active/ActiveBattles";
import BattleHistory from "./history/BattleHistory";
import CreateBattle from "./CreateBattle";
import { useAccount } from "wagmi";
import {
  useAllowedBalance,
  useLinkBalance,
  useMnkzBalance,
} from "../../../hooks/useAccountBalance";
import { getTargetNetwork } from "../../../utils/networks";
import AcceptBattle from "./AcceptBattle";
export default function Battlez() {
  const [activeTab, setActiveTab] = useState("Active");
  const [createOpen, setCreateOpen] = useState(false);
  const [acceptOpen, setAcceptOpen] = useState(false);
  const [selectedBattleInstance, setSelectedBattleInstance] = useState(null);

  const connectedAccount = useAccount();

  const { balance: mnkzBalance } = useMnkzBalance(connectedAccount?.address);
  const { balance: linkBalance } = useLinkBalance(connectedAccount?.address);

  const { allowance: mnkzAllowance } = useAllowedBalance(
    connectedAccount?.address,
    getTargetNetwork().MNKZ_CONTRACT_ADDRESS,
    getTargetNetwork().ZOOG_BATTLER_CONTRACT_ADDRESS
  );
  const { allowance: linkAllowance } = useAllowedBalance(
    connectedAccount?.address,
    getTargetNetwork().LINK_TOKEN_CONTRACT_ADDRESS,
    getTargetNetwork().ZOOG_BATTLER_CONTRACT_ADDRESS
  );

  const closeCreateModal = () => {
    setCreateOpen(false);
  };

  const clickActiveInstance = (item) => {
    setSelectedBattleInstance(item);
    setAcceptOpen(true);
  };

  const closeAcceptModeal = () => {
    setSelectedBattleInstance(null);
    setAcceptOpen(false);
  };

  const tabs = ["Active", "History"];

  return (
    <>
      <div class="p-1 sm:p-5 justify-center flex flex-col">
        <div class="flex flex-col relative">
          <div class="m-auto flex items-start">
            <h1 class="m-auto text-[2.5rem] sm:text-[4rem] font-bold">
              Battlez
            </h1>
            <span class="bg-mnkz-pelu px-2 md:px-4 py-1 md:py-2 rounded-xl border-solid border-black border-2 top-0 font-bold box-shadow-custom">
              Beta
            </span>
          </div>
        </div>
        <div class="flex flex-row justify-between">
          {tabs.map((item, index) => {
            return (
              <div
                key={index}
                class={`w-full text-center border-0 border-b-4 border-solid mx-2 mt-2 hover:cursor-pointer hover:text-mnkz-tan hover:border-mnkz-tan ${
                  item === activeTab
                    ? "border-mnkz-wobo text-mnkz-wobo"
                    : "border-black"
                }`}
                onClick={() => setActiveTab(item)}
              >
                <span class="text-xl">{item}</span>
              </div>
            );
          })}
        </div>
        {activeTab === "Active" && (
          <ActiveBattles
            clickActiveInstance={clickActiveInstance}
            setCreateOpen={setCreateOpen}
          />
        )}
        {activeTab === "History" && <BattleHistory />}
        <div
          class="z-20 bg-white hover:bg-gray-900 hover:cursor-pointer border-black border-solid border-4 rounded-full bottom-2 md:bottom-4 right-4 md:right-6 w-auto fixed"
          onClick={() => setCreateOpen(true)}
        >
          <div class="flex flex-row justify-left px-2 py-4 relative">
            <div class="flex">
              <img
                class="w-14 px-2"
                src={`${process.env.PUBLIC_URL}/images/zoogz/stats/aggression.png`}
                alt="start battle"
              />
            </div>
          </div>
        </div>
        <CreateBattle
          isOpen={createOpen}
          onClose={closeCreateModal}
          account={connectedAccount?.address}
          mnkzBalance={mnkzBalance}
          mnkzAllowance={mnkzAllowance}
          linkBalance={linkBalance}
          linkAllowance={linkAllowance}
        />
        <AcceptBattle
          isOpen={acceptOpen}
          onClose={closeAcceptModeal}
          selectedInstance={selectedBattleInstance}
          account={connectedAccount?.address}
          mnkzBalance={mnkzBalance}
          mnkzAllowance={mnkzAllowance}
          linkBalance={linkAllowance}
          linkAllowance={linkAllowance}
        />
      </div>
    </>
  );
}
