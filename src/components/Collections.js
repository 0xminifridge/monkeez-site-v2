import { useEffect } from "react";
import {
  MARKET_LIST,
  MONKEEZ_MARKET_DATA,
  ZOOGZ_MARKET_DATA,
  ZUNGLE_LAND_MARKET_DATA,
} from "../utils/markets";
import { Tooltip } from "flowbite-react";

export default function Collections({ title }) {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = title;
  }, []);
  const collections = [
    {
      name: "Monkeez",
      image: `${process.env.PUBLIC_URL}/images/monkeez-logo-with-bg.png`,
      description:
        "A collection of 4,000 NFTs on the Avalanche blockchain. Each Monkee has been randomly generated from 300,000 varieties of clothes, furs, eyes and head accessories. ",
      path: "/collections/monkeez",
    },
    {
      name: "Zoogz",
      image: `${process.env.PUBLIC_URL}/images/zoogz/collection-image-zoogz.png`,
      description:
        "Zungle companion creatures! Opened from a shipment of Cratez, Zoogz are upgradeable NFTs that come in 4 types and with 4 stats. Stats are initialized using Chainlink VRF and upgraded with items purchased in the Zungle Item Shop",
      path: "/collections/zoogz",
    },
    {
      name: "Zungle Landz",
      image: `${process.env.PUBLIC_URL}/images/landz/collection-image-land.png`,
      description:
        "Zungle Landz are the third expansion of the Monkeez ecosystem allowing land owners to choose their own adventure as they explore this virtual world.",
      path: "/collections/landz",
    },
  ];
  return (
    <div class="flex justify-center items-center py-4">
      <div class="flex flex-col justify-center">
        {collections.map((item, index) => {
          return (
            <div class="p-4 bg-white my-4 mx-2 border-black border-4 rounded-lg border-solid overflow-y-auto overflow-x-clip box-shadow-custom">
              <div key={index} class="flex flex-col md:flex-row items-center ">
                {/* image */}
                <div class="md:mr-10 px-4 py-2 m-auto">
                  <img
                    src={item.image}
                    class="max-w-[200px] w-[100%] rounded-full"
                  />
                </div>
                <div class="flex flex-col justify-center max-w-[400px] text-center md:text-left">
                  <h2 class="text-[50px] font-extrabold">{item.name}</h2>
                  <span class="my-2">{item.description}</span>
                  {/* <a
                    class="text-black text-center px-4 py-2 bg-mnkz-tan rounded-full border-black border-2 border-solid hover:text-white w-auto"
                    href={item.path}
                  >
                    View Collection
                  </a> */}
                  <div class="flex flex-row justify-center my-2">
                    {item.name === "Monkeez" && (
                      <>
                        {MARKET_LIST.map((item, index) => {
                          return (
                            <Tooltip content={`Buy on ${item}`}>
                              <a
                                key={index}
                                class="hover:cursor-pointer hover:opacity-70 overflow-hidden rounded-full flex items-center justify-center m-2 aspect-square border-0 border-black border-solid"
                                href={MONKEEZ_MARKET_DATA[item].collection}
                                target="_blank"
                              >
                                <img
                                  src={`${
                                    process.env.PUBLIC_URL
                                  }/images/markets/${item.toLowerCase()}.png`}
                                  width="50"
                                  alt={item}
                                />
                              </a>
                            </Tooltip>
                          );
                        })}
                      </>
                    )}
                    {item.name === "Zoogz" && (
                      <>
                        {MARKET_LIST.map((item, index) => {
                          return (
                            <Tooltip content={`Buy on ${item}`}>
                              <a
                                key={index}
                                class="hover:cursor-pointer hover:opacity-70 overflow-hidden rounded-full flex items-center justify-center m-2 aspect-square border-0 border-black border-solid"
                                href={ZOOGZ_MARKET_DATA[item].collection}
                                target="_blank"
                              >
                                <img
                                  src={`${
                                    process.env.PUBLIC_URL
                                  }/images/markets/${item.toLowerCase()}.png`}
                                  width="50"
                                  alt={item}
                                />
                              </a>
                            </Tooltip>
                          );
                        })}
                      </>
                    )}
                    {item.name === "Zungle Landz" && (
                      <>
                        {MARKET_LIST.map((item, index) => {
                          console.log(item, ZUNGLE_LAND_MARKET_DATA[item]);
                          return (
                            <Tooltip content={`Buy on ${item}`}>
                              <a
                                key={index}
                                class="hover:cursor-pointer hover:opacity-70 overflow-hidden rounded-full flex items-center justify-center m-2 aspect-square border-0 border-black border-solid"
                                href={ZUNGLE_LAND_MARKET_DATA[item].collection}
                                target="_blank"
                              >
                                <img
                                  src={`${
                                    process.env.PUBLIC_URL
                                  }/images/markets/${item.toLowerCase()}.png`}
                                  width="50"
                                  alt={item}
                                />
                              </a>
                            </Tooltip>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
