import { useState, useEffect } from "react";
import { useDomain, useParsedAddress } from "../../hooks/useAccount";

export default function OwnerDetails({
  ownerProfileImage,
  owner,
  isOwner,
  collection,
}) {
  const collectionImages = {
    monkeez: "monkeez-logo-with-bg.png",
    zoogz: "zoogz/collection-image-zoogz.png",
  };

  const { domain: vanityAddress } = useDomain(owner);
  const parsedAddress = useParsedAddress(owner);

  // const fetchVanityAddress = async () => {
  //   const username = await getUsernameForAddress(owner);
  //   if (username) {
  //     setVanityAddress(username);
  //   }
  // };

  // useEffect(() => {
  //   if (owner) {
  //     fetchVanityAddress();
  //   }
  // }, [owner]);
  return (
    <div class="flex flex-row justify-between">
      <div class="flex flex-col justify-start text-start">
        <p class="text-sm">Owner</p>
        <div class="flex flex-row justify-center items-center">
          <img
            src={ownerProfileImage}
            alt="Owner"
            class="w-10 rounded-full aspect-square mr-2"
          />
          <a
            class="text-lg font-bold text-black hover:text-mnkz-tan"
            href={`/accounts/${owner}`}
          >
            {isOwner
              ? "You"
              : vanityAddress?.startsWith("0x")
              ? parsedAddress
              : vanityAddress}
          </a>
        </div>
      </div>
      <div class="flex flex-col justify-start text-start">
        <p class="text-sm">Collection</p>
        <div class="flex flex-row justify-center items-center">
          <img
            src={`${process.env.PUBLIC_URL}/images/${
              collectionImages[collection?.toLowerCase()]
            }`}
            class="w-10 rounded-full aspect-square mr-2"
          />
          <a
            class="text-lg font-bold text-black hover:text-mnkz-tan"
            href={`/collections`}
          >
            {collection}
          </a>
        </div>
      </div>
    </div>
  );
}
