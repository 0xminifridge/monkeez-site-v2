import { ZUNGLE_CRAFTABLE_ITEMS } from "../../utils/collection-data";
import ResourceItemCard from "./ResourceItemCard";

export default function ResourceItems() {
  const resourceUseCases = [
    {
      name: "Collect",
      description:
        "Extract resources from land, or quest with Monkeez and Zoogz",
      image: `${process.env.PUBLIC_URL}/images/landz/buildings/resource-extractor.png`,
    },
    {
      name: "Craft",
      description: "Complete recipes to combine resources into equipables",
      image: `${process.env.PUBLIC_URL}/images/item-shop.png`,
    },
    {
      name: "Upgrade",
      description:
        "Upgrade buildings increasing further functionality of the plot",
      image: `${process.env.PUBLIC_URL}/images/hut.png`,
    },
  ];
  return (
    <>
      <div class="container m-auto flex flex-col justify-center py-20">
        <div class="flex justify-center">
          <span class="my-2 text-white text-4xl md:text-5xl font-bold tracking-wider bg-mnkz-wobo rounded-full border-4 border-solid border-black py-2 px-4 box-shadow-custom">
            Resources
          </span>
        </div>
        <div class="bg-white border-solid border-4 border-black rounded-xl p-2 md:p-4 m-2 box-shadow-custom">
          <div class="grid grid-rows-3 md:grid-rows-1 grid-flow-col justify-center items-center w-full gap-4 ">
            {resourceUseCases?.map((item, index) => {
              return (
                <div class="flex justify-center flex-col w-full">
                  <div class="flex justify-center bg-mnkz-blue rounded-xl mb-2">
                    <img
                      src={item?.image}
                      alt={item?.name}
                      class="w-full max-w-[350px] md:max-w-[300px] aspect-square object-contain"
                    />
                  </div>
                  <div class="bg-gray-100 rounded-xl inline-flex align-top flex-col justify-center items-center text-center h-full p-1">
                    <span class="font-bold text-2xl border-0 border-b-2 border-solid border-black">
                      {item?.name}
                    </span>
                    <span class="my-2 text-xs sm:text-base lg:text-lg">
                      {item?.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <div class="flex justify-center items-center text-center max-w-[600px] w-full m-auto mb-4">
            <span>
              Resources can either be extracted from land tiles or obtained
              through questing with Zungle NFTs. These items are then used in
              recipes for crafting items and leveling structures. Get to work!
            </span>
          </div> */}
          {/* <div class="grid grid-rows-3 sm:grid-rows-3 md:grid-rows-2 lg:grid-rows-1 grid-flow-col gap-1">
            {ZUNGLE_CRAFTABLE_ITEMS?.map((item, index) => {
              return <ResourceItemCard key={index} item={item} />;
            })}
          </div> */}
        </div>
      </div>
    </>
  );
}
