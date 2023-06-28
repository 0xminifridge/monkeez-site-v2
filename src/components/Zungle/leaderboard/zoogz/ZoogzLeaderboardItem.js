import { ZOOGZ_THUMBNAIL_URL_LG } from "../../../../utils/metadata";
import { ZOOG_STATS } from "../../../../utils/collection-data";
import { Link } from "react-router-dom";
import {
  useDomain,
  useParsedAddress,
  useProfileImage,
} from "../../../../hooks/useAccount";

export default function ZoogzLeaderboardItem({ item }) {
  const { domain } = useDomain(item?.owner);
  const parsedAddress = useParsedAddress(item?.owner);
  const { profileImage } = useProfileImage(item?.owner);

  return (
    <Link class="text-black" target="_blank" to={`/zoogz/${item.id}`}>
      <div class="my-2 md:my-4 border-black border-solid border-2 sm:border-4 rounded-xl bg-gray-200 hover:cursor-pointer hover:bg-gray-300 flex justify-between items-center">
        <div class="flex flex-row justify-between items-center p-1 md:p-4 m-auto w-full px-2">
          <div class="relative flex items-center">
            <span class="top-2 left-2 absolute hidden lg:block rounded-lg bg-gray-300/50 px-2 py-1">
              {item.id}
            </span>
            <img
              src={`${ZOOGZ_THUMBNAIL_URL_LG}/${item.id}.png`}
              alt={`Zoog #${item.id}`}
              class="w-10 sm:w-16 md:w-24 lg:w-40 rounded-full md:rounded-lg lg:rounded-xl"
            />
          </div>

          {/* {medalIds.includes(item.id) && (
            <div class="flex-col justify-center flex text-center">
              <img
                src={`./images/medal_${medalIds.indexOf(item.id) + 1}.png`}
                alt="Medal"
                class="w-5 md:w-10"
              />
            </div>
          )}

          {!medalIds.includes(item.id) && (
            <div class="flex-col justify-center text-center invisible">
              <img
                src="./images/medal_3.png"
                alt="No medal"
                class="w-5 md:w-10"
              />
            </div>
          )} */}

          <div class="flex-col justify-center flex text-center text-xs md:text-lg items-center font-bold">
            <span class="text-sm md:text-xl">{item.name}</span>
            <div class="flex flex-row justify-between items-center">
              <img
                src={
                  profileImage ||
                  `${process.env.PUBLIC_URL}/images/monkeez-logo-with-bg.png`
                }
                class="w-8 aspect-square rounded-full mx-2 hidden md:block"
              />
              <span class="text-sm">
                {domain?.startsWith("0x") ? parsedAddress : domain}
              </span>
            </div>
          </div>

          <div class="flex flex-col justify-center font-bold">
            <img
              src={`${process.env.PUBLIC_URL}/images/zoogz/stats/total-level.png`}
              alt="Total Level"
              class="w-5 md:w-10"
            />
            <h3 class="m-auto text-xs sm:text-sm lg:text-lg">
              {item?.totalLevel}
            </h3>
          </div>

          {ZOOG_STATS.map((stat, index) => {
            return (
              <div key={index} class="flex flex-col justify-center font-bold">
                <img
                  src={`${process.env.PUBLIC_URL}/images/zoogz/stats/${stat}.png`}
                  alt={stat}
                  class="w-5 md:w-10"
                />
                <h3 class="m-auto text-xs sm:text-sm lg:text-lg">
                  {item[stat?.toLowerCase()]}
                </h3>
              </div>
            );
          })}
          <div class="flex flex-col justify-center font-bold">
            <img
              src={`${process.env.PUBLIC_URL}/images/zoogz/stats/trophy.png`}
              alt={"wins"}
              class="w-5 md:w-10"
            />
            <h3 class="m-auto text-xs sm:text-sm lg:text-lg">
              {item?.wins || 0}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
