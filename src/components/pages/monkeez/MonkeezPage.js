import Helmet from "react-helmet";
import { useParams } from "react-router-dom";
import { MONKEEZ_IMAGE_URL } from "../../../utils/metadata";
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

export default function MonkeezPage() {
  const { id } = useParams();
  const [isOwner, setIsOwner] = useState(false);

  const connectedAccount = useSelector((state) => state.account);
  const signer = useSigner();
  const navigate = useNavigate();

  const { data, isLoading } = useMonkeeForId(id);

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
                    #{id}
                  </span>
                  <span class="absolute top-2 right-2 rounded-lg bg-gray-300/50 md:text-xl px-2 py-1">
                    {data?.tribe}
                  </span>
                  <img
                    src={`${MONKEEZ_IMAGE_URL}/${id}.png`}
                    alt={`Monkeez #${id}`}
                    class="max-w-[680px] w-[100%] object-contain rounded-lg"
                  />
                </div>
                <NFTActions
                  isOwner={isOwner}
                  contractAddress={getTargetNetwork().MONKEEZ_CONTRACT_ADDRESS}
                  id={id}
                  signer={signer}
                />
              </div>
              {/* right column */}
              <div class="overflow-y-auto px-2 md:px-4 max-w-[36rem]">
                <div class="flex flex-col justify-center text-start">
                  <h2 class="text-[35px] font-bold">Monkeez #{id}</h2>
                  <MarketListContainer
                    marketData={MONKEEZ_MARKET_DATA}
                    id={id}
                  />
                  <OwnerDetails
                    ownerProfileImage={ownerProfileImage}
                    isOwner={isOwner}
                    owner={data?.owner}
                    collection={"Monkeez"}
                  />

                  <div class="flex items-center justify-center flex-col">
                    <div class="flex flex-col justify-start w-full md:w-auto">
                      <div class="flex justify-start items-center flex-row self-start m-auto">
                        <img
                          src={`${process.env.PUBLIC_URL}/images/mnkz-token.png`}
                          class="max-w-[50px] lg:max-w-[75px] w-[100%]"
                          // class="max-w-[50px] w-[100%]"
                        />
                        <span>{data?.claimable} MNKZ to claim</span>
                      </div>
                      <button
                        class={`${isOwner ? "visible" : "invisible"} ${
                          TYPE_MAPPINGS[data?.tribe.toLowerCase()]
                        } box-shadow-custom w-full md:w-auto bottom-6 hover:bg-mnkz-tan w-70 border-2 px-4 py-2 rounded-xl text-lg hover:text-white hover:cursor-pointer right-0 disabled:bg-gray-300 disabled:text-light disabled:cursor-default disabled:hover:text-gray-400`}
                        //   onClick={() => claim(id)}
                        //   disabled={transactionProcessing}
                      >
                        Claim MNKZ
                      </button>
                    </div>

                    <div class="w-full h-[4vh] flex flex-row justify-center items-center m-auto mt-2">
                      <div
                        style={{
                          height: "30px",
                          width: "100%",
                          backgroundColor: "#e0e0de",
                          borderRadius: 50,
                          border: "2px solid black",
                        }}
                      >
                        <div
                          class="sf-rounding"
                          style={{
                            height: "100%",
                            width: "100%",
                            backgroundColor: "#000",
                            borderRadius: "inherit",
                            textAlign: "right",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            class={`${
                              TYPE_MAPPINGS[data?.tribe?.toLowerCase()]
                            }`}
                            style={{
                              height: "100%",
                              display: "flex",
                              width: `${data?.completionPercentage}%`,
                              animation: "progress 0.5s ease-in-out forwards",
                            }}
                          >
                            <span
                              style={{
                                padding: "5",
                                color: "white",
                                fontWeight: "bold",
                                margin: "auto",
                              }}
                            >
                              {Math.round(data?.completionPercentage) || 0}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <img
                        src={`${process.env.PUBLIC_URL}/images/mnkz-token.png`}
                        class="max-w-[50px] w-[100%]"
                      />
                      <span>
                        +{MONKEEZ_EMISSION_RATES[data?.tribe?.toLowerCase()]}
                      </span>
                    </div>
                  </div>

                  <AttributesContainer
                    attributes={data?.attributes}
                    tribe={data?.tribe?.toLowerCase()}
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
