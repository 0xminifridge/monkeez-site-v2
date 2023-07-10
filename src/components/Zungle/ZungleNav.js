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
import { BackpackIcon, CrateIcon } from "../icons/NavIcons";
import CartIcon from "../icons/CartIcon";
import { FaShoppingCart } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import Battlez from "./battlez/Battlez";

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
      component: (
        <img
          src={`${process.env.PUBLIC_URL}/images/nav/nav-monkeez.png`}
          alt="Monkeez"
          class="w-6 sm:w-8 object-cover py-2 block"
        />
      ),
    },
    {
      name: "Zoogz",
      color: "bg-mnkz-wobo",
      classes: "text-lg lg:text-2xl xl:text-3xl",
      component: (
        <img
          src={`${process.env.PUBLIC_URL}/images/nav/nav-zoogz.png`}
          alt="Zoogz"
          class="w-6 sm:w-8 object-cover py-2 block"
        />
      ),
    },
    {
      name: "Shop",
      color: "bg-mnkz-xeba",
      classes: "text-lg lg:text-2xl xl:text-3xl",
      component: <FaShoppingCart class="text-2xl w-10 text-black" />,
    },
    {
      name: "Battlez",
      color: "bg-mnkz-pelu",
      classes: "text-lg lg:text-2xl xl:text-3xl",
      component: (
        <img
          src={`${process.env.PUBLIC_URL}/images/nav/nav-battlez.png`}
          alt="Battlez"
          class="w-10 object-cover py-2 block"
        />
      ),
    },
    {
      name: "Cratez",
      color: "bg-mnkz-blue",
      classes: "text-lg lg:text-2xl xl:text-3xl",
      component: <CrateIcon class="text-2xl w-10 text-black" />,
    },
    {
      name: "Leaderboard",
      color: "bg-mnkz-api",
      classes: "text-sm lg:text-xl",
      component: (
        <MdLeaderboard class="text-2xl w-10 text-black" />
        // <img
        //   src={`${process.env.PUBLIC_URL}/images/nav/nav-leaderboard.png`}
        //   alt="Leaderboard"
        //   class="w-6 sm:w-8 object-cover py-2 block"
        // />
      ),
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
        return <Battlez />;

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
      <div class="sm:h-[100vh] flex items-center justify-center flex-wrap sm:flex-nowrap">
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
                  class={`box-shadow-custom duration-150 h-[6vh] w-[12vw] my-1 overflow-hidden border-4 border-black border-solid rounded-2xl text-center flex items-center flex-col justify-center hover:bg-mnkz-tan hover:cursor-pointer hover:text-white ${
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
                    <div class="block lg:hidden">{item?.component}</div>
                    {/* <img
                      src={`${
                        process.env.PUBLIC_URL
                      }/images/nav/nav-${item?.name?.toLowerCase()}.png`}
                      alt={`${item?.name?.toLowerCase()}`}
                      class="w-8 object-cover "
                    /> */}
                  </div>
                </div>
              </Tooltip>
            );
          })}
        </div>
        {/* Mobile Nav */}
        <div class="box-shadow-custom bg-white overflow-x-auto overflow-y-clip w-[90vw] h-full min-h-[75px] mt-4 border-4 border-black border-solid rounded-2xl flex items-center justify-start flex-row sm:hidden mb-4">
          {NavItems.map((item, index) => {
            return (
              <Tooltip content={item?.name} placement="bottom">
                <div
                  key={index}
                  class={`sm:box-shadow-custom duration-150 h-[50px] w-[15vw] mx-1 border-4 border-black border-solid rounded-2xl text-center flex items-center flex-row justify-center hover:bg-mnkz-tan hover:cursor-pointer hover:text-white p-1 ${
                    item?.color
                  } ${
                    item?.name?.toLowerCase() === activeTab?.toLowerCase()
                      ? "text-white"
                      : ""
                  }`}
                  onClick={() => clickTab(item?.name)}
                >
                  <div>{item?.component}</div>
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
