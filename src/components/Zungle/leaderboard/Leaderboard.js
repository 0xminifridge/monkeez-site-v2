import { useState } from "react";
import ZoogzLeaderboard from "./zoogz/ZoogzLeaderboard";
import { useZoogzLeaderboard } from "../../../hooks/useZoogz";
import ZScoreLeaderboard from "./zoogz/ZScoreLeaderboard";

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("Zoogz");
  const tabs = ["Zoogz", "ZScore"];

  return (
    <>
      <div class="p-1 sm:p-5 justify-center flex flex-col">
        <div class="flex flex-col relative">
          <div class="m-auto flex items-start">
            <h1 class="m-auto text-[2.5rem] sm:text-[4rem] font-bold">
              Leaderboard
            </h1>
          </div>
        </div>
        <div class="flex flex-row justify-between">
          {tabs.map((item, index) => {
            return (
              <div
                key={index}
                class={`font-bold w-full text-center border-0 border-b-4 border-solid mx-2 mt-2 hover:cursor-pointer hover:text-mnkz-tan hover:border-mnkz-tan ${
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
        {activeTab === "Zoogz" && <ZoogzLeaderboard />}
        {activeTab === "ZScore" && <ZScoreLeaderboard />}
      </div>
    </>
  );
}
