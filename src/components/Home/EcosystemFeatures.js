import FeatureCard from "./FeatureCard";
import { Tooltip } from "flowbite-react";
import { GrCircleInformation } from "react-icons/gr";

export default function EcosystemFeatures() {
  const features = [
    {
      name: "Stake",
      image: `${process.env.PUBLIC_URL}/images/mnkz-token.png`,
      background: "bg-mnkz-api",
      description:
        "Stake your NFTs to earn tokens used for everything in the Zungle! Currently only Monkeez can be staked for $MNKZ",
    },
    {
      name: "Shop",
      image: `${process.env.PUBLIC_URL}/images/item-shop.png`,
      background: "bg-mnkz-xeba",
      description:
        "Spend your hard earned MNKZ on some items in the Zungle Item Shop! Use these items to level your Zoogz or combine them to make craftable equipables.",
    },
    {
      name: "Battle",
      image: `${process.env.PUBLIC_URL}/images/battle-preview.png`,
      background: "bg-mnkz-pelu",
      description:
        "Battle your Zoogz against each other, PVP style for MNKZ and earn GEMZ along the way! Zoogz compete by comparing their leveled stats along with a 20 sided dice roll to determine a winner.",
    },
    {
      name: "Build",
      image: `${process.env.PUBLIC_URL}/images/landz/buildings/zungle-hut.png`,
      background: "bg-mnkz-red",
      description:
        "Build your own adventure! Build on top of your land plots expanding further functionality and interactability within the Zungle",
    },
  ];
  return (
    <>
      <div class="container m-auto flex flex-col justify-center items-center align-middle py-20">
        <div class="flex flex-row justify-center items-center">
          <div class="flex flex-row items-center my-2 text-white text-4xl md:text-5xl font-bold tracking-wider bg-mnkz-wobo rounded-full border-4 border-solid border-black py-2 px-4 box-shadow-custom">
            <span>Activities {"  "}</span>
            <div class="self-start flex overflow-hidden rounded-full hover:cursor-pointer">
              <Tooltip content="Hover over the cards to learn more">
                <GrCircleInformation class="w-4" />
              </Tooltip>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 justify-between items-center">
          {features?.map((item, index) => {
            return <FeatureCard key={index} item={item} />;
          })}
        </div>
      </div>
    </>
  );
}
