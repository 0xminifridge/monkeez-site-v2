import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Authenticate from "../Authenticate";
import { getTargetNetwork } from "../../utils/networks";
import MyMonkeez from "./monkeez/MyMonkeez";
import MyZoogz from "./zoogz/MyZoogz";
import ZungleItemShop from "./shop/ZungleItemShop";
import Leaderboard from "./leaderboard/Leaderboard";
import { setZungleActiveTab } from "../../reducers/zungleReducer";
import Cratez from "./cratez/Cratez";
import { useAccount, useNetwork } from "wagmi";
import { Tooltip } from "flowbite-react";

export default function ZungleNav({ title }) {
  const dispatch = useDispatch();

  const activeTab = useSelector((state) => state.zungle.zungleActiveTab);
  const [searchParams, setSearchParams] = useSearchParams();

  const connectedAccount = useAccount();
  const { chain } = useNetwork();
  const NavItems = [
    {
      name: "Monkeez",
      color: "bg-mnkz-api",
      classes: "text-lg lg:text-2xl xl:text-3xl",
    },
    {
      name: "Zoogz",
      color: "bg-mnkz-wobo",
      classes: "text-lg lg:text-2xl xl:text-3xl",
    },
    {
      name: "Shop",
      color: "bg-mnkz-xeba",
      classes: "text-lg lg:text-2xl xl:text-3xl",
    },
    {
      name: "Battlez",
      color: "bg-mnkz-pelu",
      classes: "text-lg lg:text-2xl xl:text-3xl",
    },
    {
      name: "Cratez",
      color: "bg-mnkz-blue",
      classes: "text-lg lg:text-2xl xl:text-3xl",
    },
    {
      name: "Leaderboard",
      color: "bg-mnkz-api",
      classes: "text-sm lg:text-xl",
    },
  ];

  const clickTab = (name) => {
    searchParams.set("selected", name);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    document.title = title;
    window.scroll(0, 0);
    dispatch(setZungleActiveTab(searchParams.get("selected")));
  }, [searchParams]);

  useEffect(() => {
    const selected = searchParams.get("selected");
    if (!selected) {
      clickTab("Monkeez");
    }
  });

  const renderSwitch = (tab) => {
    switch (tab) {
      case "Monkeez":
        return <MyMonkeez />;

      case "Zoogz":
        return <MyZoogz />;

      case "Shop":
        return <ZungleItemShop />;

      case "Battlez":
        return <h1>Coming soon...</h1>;

      case "Cratez":
        return <Cratez />;

      case "Leaderboard":
        return <Leaderboard />;
    }
  };

  if (!connectedAccount.address || getTargetNetwork().id !== chain?.id) {
    return <Authenticate />;
  }

  return (
    <>
      <div class="sm:h-[95vh] flex items-center justify-center flex-wrap sm:flex-nowrap">
        {/* Desktop Nav */}
        <div class="box-shadow-custom bg-white h-[90vh] w-[25vw] border-4 border-black border-solid border-l-0 rounded-r-2xl items-center flex-col hidden sm:flex py-4">
          {NavItems.map((item, index) => {
            return (
              <Tooltip
                content={item?.name}
                placement="right"
                trigger="hover"
                className="lg:hidden"
              >
                <div
                  key={index}
                  class={`box-shadow-custom h-[6vh] w-[12vw] my-1 overflow-hidden border-4 border-black border-solid rounded-2xl text-center flex items-center flex-col justify-center hover:bg-mnkz-tan hover:cursor-pointer hover:text-white ${
                    item?.color
                  } ${
                    item?.name?.toLowerCase() === activeTab?.toLowerCase()
                      ? "text-white"
                      : ""
                  }`}
                  onClick={() => clickTab(item?.name)}
                >
                  <div>
                    <span
                      class={`hidden lg:block font-bold py-2 ${item?.classes}`}
                    >
                      {item.name}
                    </span>
                    <img
                      src={`${
                        process.env.PUBLIC_URL
                      }/images/nav/nav-${item?.name?.toLowerCase()}.png`}
                      alt={`${item?.name?.toLowerCase()}`}
                      class="w-8 object-cover block lg:hidden"
                    />
                  </div>
                </div>
              </Tooltip>
            );
          })}
        </div>
        {/* Mobile Nav */}
        <div class="box-shadow-custom bg-white overflow-x-auto overflow-y-clip w-[90vw] h-[10vh] mt-4 border-4 border-black border-solid rounded-2xl flex items-center justify-start flex-row sm:hidden mb-4">
          {NavItems.map((item, index) => {
            return (
              <Tooltip content={item?.name} placement="bottom">
                <div
                  key={index}
                  class={`h-[6vh] w-[15vw] mx-1 border-4 border-black border-solid rounded-2xl text-center flex items-center flex-row justify-center hover:bg-mnkz-tan hover:cursor-pointer hover:text-white p-1 ${
                    item?.color
                  } ${
                    item?.name?.toLowerCase() === activeTab?.toLowerCase()
                      ? "text-white"
                      : ""
                  }`}
                  onClick={() => clickTab(item?.name)}
                >
                  <img
                    src={`${
                      process.env.PUBLIC_URL
                    }/images/nav/nav-${item?.name?.toLowerCase()}.png`}
                    alt={`${item?.name?.toLowerCase()}`}
                    class="w-6 sm:w-8 object-cover py-2 block"
                  />
                </div>
              </Tooltip>
            );
          })}
        </div>
        <div class="box-shadow-custom pb-[25px] md:pb-0 mx-1 sm:mx-4 h-[90vh] md:h-[90vh] w-[90vw] bg-white border-4 border-solid border-black rounded-2xl m-auto overflow-hidden">
          {renderSwitch(activeTab)}
        </div>
      </div>
    </>
  );
}
