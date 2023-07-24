import { useState, useEffect } from "react";
import { ZOOGZ_THUMBNAIL_URL_SMALL } from "../../../../utils/metadata";
import { ZOOG_STATS } from "../../../../utils/collection-data";
import { useDomain, useProfileImage } from "../../../../hooks/useAccount";
import { parseHash } from "../../../../utils/wallet";
import XWithCircle from "../../../icons/XWithCircle";
import { Link } from "react-router-dom";

export default function ActiveBattleItem({
  item,
  account,
  cancelBattle,
  clickActiveInstance,
}) {
  const { domain } = useDomain(item?.zoog?.owner);
  const { profileImage } = useProfileImage(item?.zoog?.owner);

  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    setIsOwner(item?.zoog?.owner?.toLowerCase() === account?.toLowerCase());
  }, [item?.zoog?.owner, account]);

  return (
    <div
      class={`my-2 md:my-4 border-solid border-4 rounded-xl bg-gray-200 ${
        !isOwner
          ? "border-black hover:cursor-pointer hover:bg-gray-300"
          : "border-mnkz-blue"
      } flex justify-between items-center`}
      onClick={isOwner ? undefined : () => clickActiveInstance(item)}
    >
      <div class="flex flex-row justify-between items-center p-1 md:p-4 m-auto w-full px-2 relative">
        <div class="relative flex items-center">
          <span class="top-2 left-2 absolute hidden md:block rounded-lg bg-gray-300/50 px-2 py-1">
            {item?.zoog?.id}
          </span>
          {item?.isVRF && (
            <img
              class="bottom-1 left-1 sm:bottom-2 sm:left-2 absolute block w-2 sm:w-5 md:w-8 lg:w-10 bg-gray-200 rounded-full p-0.5 sm:p-1"
              src={`${process.env.PUBLIC_URL}/images/icons/link.png`}
            />
          )}
          <img
            style={{ opacity: isOwner ? 0.4 : 1 }}
            src={`${ZOOGZ_THUMBNAIL_URL_SMALL}/${item.zoogId}.png`}
            class="w-10 sm:w-16 md:w-24 lg:w-40 rounded-full md:rounded-lg lg:rounded-xl"
          />
        </div>

        <div class="flex-col justify-center flex text-center text-xs md:text-lg items-center">
          <span class="text-sm md:text-xl">{item?.zoog?.name}</span>
          <div
            class="flex flex-row justify-between items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={
                profileImage ||
                `${process.env.PUBLIC_URL}/images/monkeez-logo-with-bg.png`
              }
              class="w-8 aspect-square rounded-full mx-2 hidden md:block"
            />
            <Link
              class="text-sm hover:text-gray-500"
              target="_blank"
              to={`/accounts/${item?.zoog?.owner}`}
            >
              {domain?.startsWith("0x") ? parseHash(item?.zoog?.owner) : domain}
            </Link>
          </div>
        </div>

        <div class="flex-col justify-center flex text-center">
          <img
            src={`${process.env.PUBLIC_URL}/images/mnkz-token.png`}
            class="w-5 sm:w-6 md:w-8 lg:w-10"
          />
          <span class="m-auto text-xs md:text-lg">{item.tokenAmt}</span>
        </div>

        {ZOOG_STATS.map((stat, index) => {
          return (
            <div class="flex flex-col justify-center" key={index}>
              <img
                src={`${process.env.PUBLIC_URL}/images/zoogz/stats/${stat}.png`}
                class="w-5 sm:w-6 md:w-8 lg:w-10"
              />
              <h3 class="m-auto text-xs md:text-lg">
                {item.zoog[stat?.toLowerCase()]}
              </h3>
            </div>
          );
        })}
        <div class="flex-col justify-center hidden md:flex text-center">
          <img
            src={`${process.env.PUBLIC_URL}/images/zoogz/stats/trophy.png`}
            class="w-5 sm:w-6 md:w-8 lg:w-10"
          />
          <span class="m-auto">{item.zoog.wins}</span>
        </div>
        <div
          class={`flex-col justify-center flex text-center hover:opacity-80 ${
            isOwner ? "visible cursor-pointer" : "invisible"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div class="" onClick={() => cancelBattle(item?.zoog?.id)}>
            <XWithCircle color={"#d6303c"} />
          </div>
        </div>
        <span class="absolute text-gray-400 text-[0.5rem] md:text-sm bottom-0 right-0.5 md:bottom-2 md:right-2 z-1">
          Created{" "}
          {new Date(item?.startTime * 1000)?.toLocaleDateString({
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}
