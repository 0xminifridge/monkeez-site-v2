import { useState, useEffect } from "react";
import { getTargetNetwork } from "../utils/networks";
import { useDispatch } from "react-redux";
import {
  createAlert,
  createError,
  createProcessing,
} from "../reducers/alertReducer";
import { toast } from "react-hot-toast";
import { useClaimForMonkeez } from "../hooks/useMnkz";
import { Tooltip } from "flowbite-react";

export default function ClaimButton({
  account,
  mnkzBalance,
  claimableBalance,
  disabled,
  monkeezIds,
}) {
  const { writeTx: claimTokens, isMining } = useClaimForMonkeez(monkeezIds);

  const addToWallet = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20", // Initially only supports ERC20, but eventually more!
            options: {
              address: getTargetNetwork().MNKZ_CONTRACT_ADDRESS, // The address that the token is at.
              symbol: "MNKZ", // A ticker symbol or shorthand, up to 5 chars.
              decimals: 18, // The number of decimals in the token
              image: "https://i.imgur.com/xBHjWdC.png", // A string url of the token logo
            },
          },
        });

        if (wasAdded) {
          alert("MNKZ added successfully");
        } else {
          alert("Signature denied");
        }
      } else {
        alert("No Metamask installed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const nFormatter = (num, digits) => {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "Mil" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
      : "0";
  };

  return (
    <>
      <div
        class={`flex flex-row items-center rounded-full bg-mnkz-wobo pr-2 py-1 border-2 border-solid border-black my-4 box-shadow-custom ${
          account ? "" : "invisible"
        }`}
      >
        <Tooltip content="Add MNKZ to wallet" placement="bottom">
          <div
            class="flex items-center rounded-full hover:cursor-pointer hover:opacity-80 duration-150 transition"
            onClick={() => addToWallet()}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/mnkz-token.png`}
              alt="MNKZ"
              class="w-8"
            />
          </div>
        </Tooltip>

        {/* <div
          id="add-to-wallet-tooltip"
          role="tooltip"
          class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Add MNKZ to wallet
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div> */}

        <span class="text-black text-sm sm:text-lg px-1">
          {nFormatter(mnkzBalance, 1)}
        </span>

        <Tooltip content={`Claim: ${nFormatter(claimableBalance, 1)}`}>
          <button
            class="rounded-full  bg-mnkz-tan text-black border-2 border-solid border-black px-2 hover:text-white hover:bg-gray-900 hover:cursor-pointer disabled:hover:cursor-default disabled:bg-gray-300 disabled:text-gray-400 duration-150 transition"
            disabled={disabled || isMining || claimableBalance === 0}
            onClick={() => claimTokens(monkeezIds)}
          >
            <span class="text-sm sm:text-lg">Claim</span>
          </button>
        </Tooltip>
      </div>
    </>
  );
}
