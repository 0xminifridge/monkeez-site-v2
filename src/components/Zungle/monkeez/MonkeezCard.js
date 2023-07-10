import { useState, useEffect } from "react";
import { TYPE_MAPPINGS } from "../../../utils/collection-data";
import { useNavigate } from "react-router-dom";
import { MONKEEZ_THUMBNAIL_URL_LG } from "../../../utils/metadata";
import {
  useStakeMonkeez,
  useStakedInfo,
  useUnstakeMonkeez,
} from "../../../hooks/useMonkeez";
import CountdownTimer from "../CountdownTimer";
import AlertSpinner from "../../AlertSpinner";
import { ThreeDots } from "react-loader-spinner";
import { useClaimForMonkeez } from "../../../hooks/useMnkz";

export default function MonkeezCard({ item }) {
  const [hovering, setHovering] = useState(false);
  const [daysStaked, setDaysStaked] = useState(null);
  const [loadingStaked, setLoadingStaked] = useState(false);

  const navigate = useNavigate();

  const { stakedTimestamp, tokensClaimable } = useStakedInfo(item.id);

  const { writeTx: stakeMonkeez, isMining: stakingMining } = useStakeMonkeez();

  const { writeTx: unstakeMonkeez, isMining: unstakeMining } =
    useUnstakeMonkeez();

  const { writeTx: claimTokens, isMining: claimMining } = useClaimForMonkeez();

  useEffect(() => {
    setLoadingStaked(true);
    if (stakedTimestamp) {
      const now = new Date();
      const stakeDate = new Date(stakedTimestamp * 1000);

      setDaysStaked(Math.floor(Math.abs(now - stakeDate) / 8.64e7));
      setLoadingStaked(false);
    }
  }, [stakedTimestamp]);

  return (
    <div
      class={`${
        "bg-mnkz-tan"
        // TYPE_MAPPINGS[item?.tribe.toLowerCase()]
      } bg-gray-900 border-4 relative rounded-2xl border-solid border-black hover:border-mnkz-tan hover:cursor-pointer w-full h-full max-h-[450px] shadow-2xl`}
      onClick={() => navigate(`/monkeez/${item.id}`)}
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div class="inline-block overflow-hidden m-0 relative rounded-t-xl">
        <h3 class="absolute top-2 left-2 z-10 rounded-lg bg-gray-300/50 px-2 py-1 hidden sm:block">
          #{item.id}
        </h3>
        <h3 class="absolute top-2 right-2 z-10 rounded-lg bg-gray-300/50 px-2 py-1 hidden sm:block">
          {item.tribe}
        </h3>
        {stakedTimestamp > 0 && (
          <div
            class={`absolute bottom-2 left-0 right-0 z-10 flex flex-row justify-center rounded-lg bg-gray-300/80 text-black px-2 py-1 w-[80%] self-center mx-auto ${
              hovering && tokensClaimable > 0 ? "flex" : "hidden"
            }`}
          >
            {daysStaked < 1 ? (
              <CountdownTimer
                epochTime={stakedTimestamp * 1000 + 24 * 60 * 60 * 1000}
              />
            ) : (
              <CountdownTimer
                epochTime={
                  stakedTimestamp * 1000 +
                  24 * 60 * 60 * 1000 * (daysStaked + 1)
                }
              />
            )}
          </div>
        )}

        <img
          class={`m-0 max-w-[300px] w-[100%] aspect-square transition-all duration-500 ${
            hovering ? "scale-110" : ""
          } block`}
          src={`${MONKEEZ_THUMBNAIL_URL_LG}/${item.id}.png`}
        />
      </div>
      <div class="pb-5 px-5 flex flex-col">
        <div class="overflow-hidden max-h-[35px]">
          <span class="text-xs sm:text-sm md:text-xl lg:text-2xl 2xl:text-3xl font-bold  overflow-y-hidden">
            Monkeez #{item.id}
          </span>
        </div>
        <div
          class={` ${stakedTimestamp > 0 ? "" : "invisible"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <span
            class="hover:cursor-pointer hover:text-white text-xs sm:text-base"
            disabled={stakingMining || unstakeMining}
            onClick={() => unstakeMonkeez([item?.id])}
          >
            Unstake
          </span>
        </div>

        {stakedTimestamp > 0 ? (
          <div class="w-full h-full" onClick={(e) => e.stopPropagation()}>
            <button
              class="max-h-[48px] overflow-hidden bg-mnkz-wobo border-2 px-4 py-2 rounded-xl text-sm sm:text-lg hover:text-white hover:bg-gray-900 hover:cursor-pointer right-0 w-full disabled:bg-gray-300 disabled:text-light disabled:cursor-default disabled:hover:text-gray-400 box-shadow-custom"
              disabled={tokensClaimable === 0}
              onClick={() => claimTokens([item?.id])}
            >
              {tokensClaimable > 0 ? (
                <>
                  <span class="block sm:hidden">Claim {tokensClaimable}</span>
                  <span class="hidden sm:block">
                    Claim {tokensClaimable} $MNKZ
                  </span>
                </>
              ) : (
                <>
                  {loadingStaked && (
                    <div class="flex justify-center items-center m-auto">
                      <ThreeDots
                        height="40"
                        width="40"
                        radius="9"
                        color="#000"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                      />
                    </div>
                  )}
                  {!loadingStaked && stakedTimestamp > 0 && (
                    <>
                      {daysStaked < 1 ? (
                        <CountdownTimer
                          epochTime={
                            stakedTimestamp * 1000 + 24 * 60 * 60 * 1000
                          }
                        />
                      ) : (
                        <CountdownTimer
                          epochTime={
                            stakedTimestamp * 1000 +
                            24 * 60 * 60 * 1000 * (daysStaked + 1)
                          }
                        />
                      )}
                    </>
                  )}
                </>
              )}
            </button>
          </div>
        ) : (
          <div class="w-full h-full" onClick={(e) => e.stopPropagation()}>
            <button
              class="max-h-[48px] overflow-hidden bg-mnkz-blue border-2 px-4 py-2 rounded-xl text-sm sm:text-lg hover:text-white hover:bg-gray-900 hover:cursor-pointer right-0 w-full disabled:bg-gray-300 disabled:text-light disabled:cursor-default disabled:hover:text-gray-400 box-shadow-custom"
              disabled={stakingMining || unstakeMining}
              onClick={() => stakeMonkeez([item?.id])}
            >
              Stake
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
