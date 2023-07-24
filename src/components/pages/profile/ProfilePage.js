import { useMonkeezForAddress } from "../../../hooks/useMonkeez";
import { useParams } from "react-router-dom";
import { useZoogz } from "../../../hooks/useZoogz";
import {
  useDomain,
  useMaxZungleScore,
  useProfileImage,
  useZungleScore,
  useZungleScoreRank,
} from "../../../hooks/useAccount";
import { parseHash } from "../../../utils/wallet";
import { ChevronDownIcon } from "../../icons/ChevronDown";
import { useEffect, useRef, useState } from "react";
import { MONKEEZ_TRIBES, ZOOG_TYPES } from "../../../utils/collection-data";
import { MARKET_PROFILE_LINK } from "../../../utils/markets";
import { Tooltip } from "flowbite-react";
import OwnedNFTs from "./OwnedNFTs";
import ZungleScore from "./ZungleScore";
import LoadingSpinner from "../../LoadingSpinner";

export default function ProfilePage() {
  const { profile } = useParams();
  const [balanceOpen, setBalanceOpen] = useState(false);
  const balanceRef = useRef();

  const { monkeez, isLoading: monkeezLoading } = useMonkeezForAddress(profile);

  const { data: zoogz, isLoading: zoogzLoading } = useZoogz(profile);

  const { profileImage } = useProfileImage(profile);

  const { domain } = useDomain(profile);

  const { data: zungleScore, isLoading: scoreLoading } =
    useZungleScore(profile);

  const { data: maxZungleScore } = useMaxZungleScore();

  const { data: rank } = useZungleScoreRank(zungleScore);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <div class="w-screen h-[80vh] md:h-[88vh] flex justify-center items-center py-4">
        <div class="bg-white w-full h-full mx-4 md:mx-10 md:my-20 border-black border-4 rounded-lg border-solid overflow-y-auto">
          <div class="py-5 px-4 grid grid-cols-1 md:grid-cols-2">
            {/* left column */}
            <div class="flex flex-col justify-center self-start md:justify-right md:sticky top-4 md:pr-[4rem] flex-shrink">
              <div class="rounded-lg relative overflow-hidden self-end">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={`${profile}`}
                    class="max-w-[680px] w-[100%] object-contain rounded-lg"
                  />
                ) : (
                  <img
                    src={`${process.env.PUBLIC_URL}/images/sad-monkee.png`}
                    class="max-w-[680px] w-[100%] object-contain rounded-lg bg-mnkz-blue"
                  />
                )}
              </div>
            </div>
            {/* right column */}
            <div class="overflow-y-auto px-2 md:px-4 max-w-[36rem]">
              <div class="flex flex-col justify-center text-start">
                <h2 class="text-[35px] font-bold">
                  {domain?.startsWith("0x") ? parseHash(profile) : domain}
                </h2>

                <div class="flex flex-row justify-start">
                  {Object.keys(MARKET_PROFILE_LINK)?.map((item, index) => {
                    return (
                      <>
                        <Tooltip content={`View on ${item}`}>
                          <a
                            key={index}
                            class="hover:cursor-pointer hover:opacity-70 overflow-hidden rounded-full flex items-center justify-center m-2 aspect-square border-0 border-black border-solid"
                            href={`${MARKET_PROFILE_LINK[item]}/${profile}`}
                            target="_blank"
                          >
                            <img
                              src={`${
                                process.env.PUBLIC_URL
                              }/images/markets/${item?.toLowerCase()}.png`}
                              width="50"
                              alt={item}
                            />
                          </a>
                        </Tooltip>
                      </>
                    );
                  })}
                </div>
                <ZungleScore
                  percentage={(parseFloat(zungleScore) / maxZungleScore) * 100}
                  score={zungleScore}
                  rank={rank}
                />

                <div
                  class={`bg-zoog-drip flex flex-col border-black border-solid border-4 rounded-lg p-4 my-2 md:my-4 overflow-hidden box-shadow-custom`}
                >
                  <div
                    class="flex flex-row justify-between items-center py-2  hover:cursor-pointer"
                    onClick={() => setBalanceOpen(!balanceOpen)}
                  >
                    <p class="font-semibold">Zungle NFTs</p>
                    <div class="flex flex-row items-center">
                      <div>
                        <p>{monkeez?.length + zoogz?.length}</p>
                      </div>
                      <ChevronDownIcon
                        direction={balanceOpen ? "up" : "down"}
                      />
                    </div>
                  </div>
                  <div
                    class={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${
                      balanceOpen ? "" : "hidden"
                    }`}
                    ref={balanceRef}
                  >
                    <div class="bg-white border-black border-solid border-2 px-4 py-2 rounded-lg">
                      <span class="text-xl">Monkeez ({monkeez?.length})</span>
                      {MONKEEZ_TRIBES.map((item, index) => {
                        return (
                          <div class="flex flex-row items-center" key={index}>
                            <img
                              src={`${
                                process.env.PUBLIC_URL
                              }/images/monkeez/tribes/${item.toLowerCase()}.png`}
                              class="w-8"
                            />
                            <span class="py-1">
                              {
                                monkeez?.filter(function (value) {
                                  return value.tribe === item;
                                }).length
                              }{" "}
                              {item}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div class="bg-white border-black border-solid border-2 px-4 py-2 rounded-lg">
                      <span class="text-xl">Zoogz ({zoogz?.length})</span>
                      {ZOOG_TYPES.map((item, index) => {
                        return (
                          <div class="flex flex-row items-center" key={index}>
                            <img
                              src={`${
                                process.env.PUBLIC_URL
                              }/images/zoogz/types/${item.toLowerCase()}.png`}
                              class="w-8"
                            />
                            <span class="py-1">
                              {
                                zoogz?.filter(function (value) {
                                  return value.type === item;
                                }).length
                              }{" "}
                              {item}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <OwnedNFTs monkeez={monkeez} zoogz={zoogz} />
                {/* {monkeezLoading || zoogzLoading ? (
                  <>
                    <LoadingSpinner />
                  </>
                ) : (
                  <>
                    {monkeez?.length > 0 ||
                      (zoogz?.length > 0 && (
                        <OwnedNFTs monkeez={monkeez} zoogz={zoogz} />
                      ))}
                  </>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
