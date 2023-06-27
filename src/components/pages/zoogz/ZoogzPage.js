import Helmet from "react-helmet";
import { useParams } from "react-router-dom";
import { ZOOGZ_IMAGE_URL } from "../../../utils/metadata";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getTargetNetwork } from "../../../utils/networks";
import { ZOOGZ_MARKET_DATA } from "../../../utils/markets";
import AttributesContainer from "../AttributesContainer";
import MarketListContainer from "../MarketListContainer";
import Loading from "../../Loading";
import { useProfileImage, useSigner } from "../../../hooks/useAccount";
import NFTActions from "../NftActions";
import OwnerDetails from "../OwnerDetails";
import ZoogProgressBars from "./ZoogProgressBars";
import {
  useZoogBattleHistory,
  useZoogForId,
  useZoogXpInfo,
  useZoogEnergy,
} from "../../../hooks/useZoogz";
import ZoogBattleHistory from "./ZoogBattleHistory";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "../../Zungle/CountdownTimer";
import { useAccount } from "wagmi";

export default function ZoogzPage() {
  const { id } = useParams();

  const [isOwner, setIsOwner] = useState(false);
  const [daysToReset, setDaysToReset] = useState(null);

  const connectedAccount = useAccount();
  const signer = useSigner();
  const navigate = useNavigate();

  const { data, isLoading, fetchData } = useZoogForId(id);

  const {
    data: xpData,
    isLoading: xpLoading,
    fetchData: fetchXpInfo,
  } = useZoogXpInfo(id);

  const { data: battleData, isLoading: historyIsLoading } =
    useZoogBattleHistory(id);

  const { profileImage: ownerProfileImage } = useProfileImage(data?.owner);

  useEffect(() => {
    const now = new Date();
    const resetData = new Date(data?.energyTs * 1000);

    setDaysToReset(Math.floor(Math.abs(now - resetData) / 8.64e7));
  }, [data?.energyTs]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    setIsOwner(
      data?.owner?.toLowerCase() === connectedAccount?.address?.toLowerCase()
    );
  }, [connectedAccount, data]);

  if (isLoading || xpLoading) {
    return <Loading />;
  }
  if (!data) {
    navigate("/home");
  } else {
    return (
      <>
        <div class="w-screen h-[80vh] md:h-[88vh] flex justify-center items-center py-4">
          <div class="bg-white w-full h-full mx-4 md:mx-10 md:my-20 border-black border-4 rounded-lg border-solid overflow-y-auto">
            <div class="py-5 px-2 md:px-4 grid grid-cols-1 md:grid-cols-2">
              {/* left column */}
              <div class="flex flex-col justify-center self-start md:justify-right md:sticky top-4 md:pr-[4rem] flex-shrink">
                <div class="rounded-lg relative overflow-hidden self-end">
                  <span class="absolute top-2 left-2 rounded-lg bg-gray-300/50 md:text-xl px-2 py-1">
                    #{data?.id}
                  </span>
                  <span class="absolute top-2 right-2 rounded-lg bg-gray-300/50 md:text-xl px-2 py-1">
                    {data?.type}
                  </span>
                  <span class="absolute bottom-2 left-2 rounded-lg bg-gray-300/50 md:text-xl px-2 py-1">
                    <div class="flex flex-row justify-center items-center">
                      <img
                        src={`${process.env.PUBLIC_URL}/images/zoogz/stats/energy.png`}
                        class="w-5"
                      />
                      {data?.energy > 0 ? (
                        <span>{data?.energy}</span>
                      ) : (
                        <>
                          {daysToReset < 1 ? (
                            <CountdownTimer
                              epochTime={
                                data?.energyTs * 1000 + 24 * 60 * 60 * 1000
                              }
                            />
                          ) : (
                            <CountdownTimer
                              epochTime={
                                data?.energyTs * 1000 +
                                24 * 60 * 60 * 1000 * (daysToReset + 1)
                              }
                            />
                          )}
                        </>
                      )}
                    </div>
                  </span>
                  <img
                    src={`${ZOOGZ_IMAGE_URL}/${id}.png`}
                    alt={`Zoog #${id}`}
                    class="max-w-[680px] w-[100%] object-contain rounded-lg"
                  />
                </div>
                <NFTActions
                  isOwner={isOwner}
                  contractAddress={getTargetNetwork().ZOOGZ_CONTRACT_ADDRESS}
                  id={id}
                  signer={signer}
                />
              </div>
              {/* right column */}
              <div class="overflow-y-auto px-2 md:px-4 max-w-[36rem]">
                <div class="flex flex-col justify-center text-start">
                  <h2 class="text-[35px] font-bold">Zoogz #{id}</h2>
                  <MarketListContainer marketData={ZOOGZ_MARKET_DATA} id={id} />
                </div>
                <OwnerDetails
                  ownerProfileImage={ownerProfileImage}
                  isOwner={isOwner}
                  owner={data?.owner}
                  collection={"Zoogz"}
                />
                <ZoogProgressBars
                  isOwner={isOwner}
                  data={data}
                  xpData={xpData}
                  fetchZoog={fetchData}
                  fetchXpInfo={fetchXpInfo}
                />

                <AttributesContainer
                  attributes={data?.attributes}
                  tribe={data?.type?.toLowerCase()}
                  startingVisibility={false}
                />

                {battleData && Object?.keys(battleData)?.length > 0 && (
                  <ZoogBattleHistory
                    tribe={data?.type}
                    defaultOpen={true}
                    battleData={battleData}
                    zoogId={id}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
