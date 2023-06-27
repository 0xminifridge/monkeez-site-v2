import FeatureCard from "./FeatureCard";
import { Tooltip } from "flowbite-react";

export default function EcosystemFeatures() {
  const features = [
    {
      name: "Battlez",
      image: `${process.env.PUBLIC_URL}/images/battle-arena.png`,
      background: "bg-mnkz-api",
      description:
        "Battle your Zoogz against each other, PVP style for MNKZ and earn GEMZ along the way! Zoogz compete by comparing their leveled stats along with a 20 sided dice roll to determine a winner.",
    },
    {
      name: "Item Shop",
      image: `${process.env.PUBLIC_URL}/images/item-shop.png`,
      background: "bg-mnkz-pelu",
      description:
        "Spend your hard earned MNKZ on some items in the Zungle Item Shop! Use these items to level your Zoogz or combine them to make craftable equipables.",
    },
    {
      name: "[Redacted]",
      image: `${process.env.PUBLIC_URL}/images/redacted-1.png`,
      background: "bg-mnkz-xeba",
      description:
        "Unfortunately, this item is [redacted]. You'll have to keep an eye on announcements and check back later",
    },
    {
      name: "[Redacted]",
      image: `${process.env.PUBLIC_URL}/images/redacted-2.png`,
      background: "bg-mnkz-red",
      description:
        "Unfortunately, this item is [redacted]. You'll have to keep an eye on announcements and check back later",
    },
  ];
  return (
    <>
      <div class="container m-auto flex flex-col justify-center items-center align-middle lg:h-[80vh]">
        <div class="flex flex-row justify-center items-center">
          <div class="flex flex-row items-center my-2 text-white text-4xl md:text-5xl font-bold tracking-wider bg-mnkz-wobo rounded-full border-4 border-solid border-black py-2 px-4 box-shadow-custom">
            <span>Activities {"  "}</span>
            <div class="self-start flex overflow-hidden rounded-full hover:cursor-pointer">
              <Tooltip content="Hover over the cards to learn more">
                <img
                  src={`${process.env.PUBLIC_URL}/images/tooltip.png`}
                  class="w-full max-w-[25px] aspect-square"
                />
              </Tooltip>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-between items-center">
          {features?.map((item, index) => {
            return <FeatureCard key={index} item={item} />;
          })}
        </div>
      </div>
    </>
  );
}
