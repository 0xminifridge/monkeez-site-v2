import { useState } from "react";

import MonkeezTile from "../MonkeezTile";
import ZoogzTile from "../ZoogzTile";

export default function OwnedNFTs({ monkeez, zoogz }) {
  const [activeTab, setActiveTab] = useState("Monkeez");

  const tabs = ["Monkeez", "Zoogz"];
  return (
    <>
      <div>
        {/* tabs */}
        <div class="flex flex-row justify-between">
          {tabs.map((item, index) => {
            return (
              <div
                class={`w-full text-center border-0 border-b-4 border-solid mx-2 my-2 hover:cursor-pointer hover:text-mnkz-tan hover:border-mnkz-tan ${
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
        {activeTab === "Monkeez" && (
          <div class="grid grid-cols-2 lg:grid-cols-2 overflow-y-auto gap-4">
            {monkeez?.map((item, index) => {
              return <MonkeezTile item={item} key={index} />;
            })}
          </div>
        )}
        {activeTab === "Zoogz" && (
          <div class="grid grid-cols-2 lg:grid-cols-2 overflow-y-auto gap-4">
            {zoogz?.map((item, index) => {
              return <ZoogzTile item={item} key={index} />;
            })}
          </div>
        )}
      </div>
    </>
  );
}
