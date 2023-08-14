import Helmet from "react-helmet";
import { useParams } from "react-router-dom";
import {
  MONKEEZ_IMAGE_URL,
  ZUNGLE_LANDZ_IMAGE_URL,
} from "../../../utils/metadata";
import { useMonkeeForId } from "../../../hooks/useMonkeez";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getTargetNetwork } from "../../../utils/networks";
import { MONKEEZ_MARKET_DATA } from "../../../utils/markets";
import {
  MONKEEZ_EMISSION_RATES,
  TYPE_MAPPINGS,
} from "../../../utils/collection-data";
import AttributesContainer from "../AttributesContainer";
import MarketListContainer from "../MarketListContainer";
import Loading from "../../Loading";
import { useProfileImage, useSigner } from "../../../hooks/useAccount";
import NFTActions from "../NftActions";
import { useNavigate } from "react-router-dom";
import OwnerDetails from "../OwnerDetails";
import { useAccount } from "wagmi";
import { useLandForId } from "../../../hooks/useLandz";

export default function LandzPage() {
  const { id } = useParams();
  const [isOwner, setIsOwner] = useState(false);

  const connectedAccount = useAccount();
  const signer = useSigner();
  const navigate = useNavigate();

  const { data, isLoading } = useLandForId(id);

  const { profileImage: ownerProfileImage } = useProfileImage(data?.owner);

  useEffect(() => {
    setIsOwner(
      data?.owner?.toLowerCase() === connectedAccount?.address?.toLowerCase()
    );
  }, [connectedAccount, data]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    navigate("/404");
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
                    #{id}
                  </span>
                  <span class="absolute top-2 right-2 rounded-lg bg-gray-300/50 md:text-xl px-2 py-1">
                    {data?.biome}
                  </span>
                  <img
                    src={`${ZUNGLE_LANDZ_IMAGE_URL}/${id}.png`}
                    alt={`Monkeez #${id}`}
                    class="max-w-[680px] w-[100%] object-contain rounded-lg"
                  />
                </div>
                <NFTActions
                  isOwner={isOwner}
                  contractAddress={
                    getTargetNetwork().ZUNGLE_LANDZ_CONTRACT_ADDRESS
                  }
                  id={id}
                  signer={signer}
                />
              </div>
              {/* right column */}
              <div class="overflow-y-auto px-2 md:px-4 max-w-[36rem]">
                <div class="flex flex-col justify-center text-start">
                  <h2 class="text-[35px] font-bold">Zungle Landz #{id}</h2>
                  <MarketListContainer
                    marketData={MONKEEZ_MARKET_DATA}
                    id={id}
                  />
                  <OwnerDetails
                    ownerProfileImage={ownerProfileImage}
                    isOwner={isOwner}
                    owner={data?.owner}
                    collection={"Zungle Landz"}
                  />

                  <AttributesContainer
                    attributes={data?.attributes}
                    tribe={data?.biome?.toLowerCase()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
