import { Link } from "react-router-dom";
import {
  useDomain,
  useParsedAddress,
  useProfileImage,
} from "../../../../hooks/useAccount";
import { parseHash } from "../../../../utils/wallet";

export default function ZScoreLeaderboardItem({ item, index, medalIds }) {
  const { domain } = useDomain(item?.account);
  const { profileImage } = useProfileImage(item?.account);

  return (
    <Link
      class="text-black"
      target="_blank"
      to={{
        pathname: `/accounts/${item?.account}`,
      }}
    >
      <div class="my-2 md:my-4 border-black border-solid border-4 rounded-xl bg-gray-200 hover:cursor-pointer hover:bg-gray-300 flex justify-between items-center">
        <div class="flex flex-row justify-between items-center p-1 md:p-4 m-auto w-full px-2">
          <div class="relative flex items-center">
            <img
              src={
                profileImage ||
                `${process.env.PUBLIC_URL}/images/monkeez-logo-with-bg.png`
              }
              alt={item?.account}
              class="w-10 sm:w-16 md:w-24 lg:w-40 rounded-full md:rounded-lg"
            ></img>

            {index < 3 ? (
              <img
                src={`${process.env.PUBLIC_URL}/images/icons/medal_${
                  index + 1
                }.png`}
                alt="Medal"
                class=" w-full max-w-[30px] sm:max-w-[35px] md:max-w-[50px] mx-2 bg-mnkz-wobo px-1 md:px-2 py-1 box-shadow-custom rounded-lg border-black border-2 border-solid"
              />
            ) : (
              <span class=" bg-mnkz-tan mx-2 px-1 md:px-2 py-1 rounded-lg border-black border-2 border-solid box-shadow-custom text-xs sm:text-sm md:text-lg">
                {" "}
                #{index + 1}
              </span>
            )}
          </div>

          <div class="flex-col justify-center flex text-center text-sm sm:text-lg md:text-2xl items-center">
            <h5>
              {domain?.startsWith("0x") ? parseHash(item?.account) : domain}
            </h5>
          </div>

          <div class="flex flex-row justify-center items-center bg-mnkz-tan px-1 md:px-2 py-1 rounded-lg border-black border-2 border-solid box-shadow-custom">
            <span class="text-black">{item?.zScore}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
