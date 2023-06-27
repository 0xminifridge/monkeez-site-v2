import { Tooltip } from "flowbite-react";
export default function TokenInfo() {
  const tokenList = [
    {
      name: "MNKZ",
      description:
        "An ecosystem token powering anything and everything in the Zungle gained by staking Monkeez or battling Zoogz. MNKZ is used for buying items, unlocking land tiles, building structures, and much much more. As the Zungle grows, so does the use cases for MNKZ.",
      link: "https://monkeez.gitbook.io/monkeez/monkeez/usdmnkz",
    },
    {
      name: "GEMZ",
      description:
        "A secondary token launched with the land expansion of the Zungle and obtained through Zoog Battlez. GEMZ is used for avoiding cooldowns in the land sector of the Zungle, skipping wait times for tile unlocks and upgrades.",
      link: "https://monkeez.gitbook.io/monkeez/monkeez/usdmnkz",
    },
  ];
  return (
    <>
      <div class="container m-auto flex flex-col justify-center md:h-[80vh] ">
        <div class="flex justify-center">
          <span class="my-2 text-white text-4xl md:text-5xl font-bold tracking-wider bg-mnkz-wobo rounded-full border-4 border-solid border-black py-2 px-4 box-shadow-custom">
            Tokens
          </span>
        </div>
        <div class="bg-white border-solid border-4 border-black rounded-xl p-2 md:p-4 m-2 box-shadow-custom">
          <div class="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-4">
            {tokenList?.map((item, index) => {
              return (
                <div class="flex flex-col justify-center items-center bg-gray-100 rounded-xl p-1 ">
                  <div class="flex flex-row justify-center items-center ">
                    <img
                      src={`${
                        process.env.PUBLIC_URL
                      }/images/${item?.name?.toLowerCase()}-token.png`}
                      class="aspect-square w-40"
                    />
                    <a
                      href={item?.link}
                      target="_blank"
                      class=" text-black text-4xl px-4 py-2 rounded-full bg-mnkz-blue border-4 border-solid border-black box-shadow-custom hover:bg-mnkz-tan hover:cursor-pointer"
                    >
                      <span>${item?.name}</span>
                    </a>
                    <div class="ml-2 mb-2 flex overflow-hidden rounded-full hover:cursor-pointer items-center">
                      <Tooltip content={item.description}>
                        <img
                          src={`${process.env.PUBLIC_URL}/images/tooltip.png`}
                          class="w-full max-w-[25px] aspect-square"
                        />
                      </Tooltip>
                    </div>
                  </div>
                  {/* <div class="p-2 text-center text-lg md:text-xl font-bold">
                    {item?.description}
                  </div> */}
                  {item?.name === "MNKZ" && (
                    <div class="text-base md:text-lg w-full md:w-[75%] m-auto border-black border-4 border-solid rounded-xl p-2 my-2">
                      <div class="flex flex-row items-center justify-between bg-gray-200 p-4 rounded-xl my-1">
                        <img
                          src={`${process.env.PUBLIC_URL}/images/item-shop.png`}
                          class="w-full max-w-[100px] aspect-square"
                        />
                        <span>Buy NFTs</span>
                      </div>
                      <div class="flex flex-row items-center justify-between bg-gray-200 p-4 rounded-xl my-1">
                        <div class="flex flex-row">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/zoogz/types/glow.png`}
                            class="w-full max-w-[75px] aspect-square"
                          />
                          <img
                            src={`${process.env.PUBLIC_URL}/images/zoogz/types/drip.png`}
                            class="w-full max-w-[75px] aspect-square"
                          />
                        </div>

                        <span>Battle Zoogz</span>
                      </div>
                      <div class="flex flex-row items-center justify-between bg-gray-200 p-4 rounded-xl my-1">
                        <img
                          src={`${process.env.PUBLIC_URL}/images/hut.png`}
                          class="w-full max-w-[100px] aspect-square"
                        />
                        <span>Build structures</span>
                      </div>
                    </div>
                  )}
                  {item?.name === "GEMZ" && (
                    <div class="text-base md:text-lg w-full md:w-[75%] m-auto border-black border-4 border-solid rounded-xl p-2 my-2">
                      <div class="flex flex-row items-center justify-between bg-gray-200 p-4 rounded-xl my-1">
                        <img
                          src={`${process.env.PUBLIC_URL}/images/zoogz/stats/clock.png`}
                          class="w-full max-w-[50px] aspect-square"
                        />
                        <span>Skip cooldowns</span>
                      </div>
                      <div class="flex flex-row items-center justify-between bg-gray-200 p-4 rounded-xl my-1">
                        <div class="flex flex-row">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/zoogz/types/glow.png`}
                            class="w-full max-w-[75px] aspect-square"
                          />
                          <img
                            src={`${process.env.PUBLIC_URL}/images/zoogz/types/drip.png`}
                            class="w-full max-w-[75px] aspect-square"
                          />
                        </div>

                        <span>Battle Zoogz</span>
                      </div>
                      <div class="flex flex-row items-center justify-between bg-gray-200 p-4 rounded-xl my-1">
                        <img
                          src={`${process.env.PUBLIC_URL}/images/hut.png`}
                          class="w-full max-w-[100px] aspect-square"
                        />
                        <span>Build structures</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
