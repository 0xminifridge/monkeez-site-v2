import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect, useSwitchNetwork } from "wagmi";

import { getTargetNetwork } from "../utils/networks";
import { ChevronDownIcon } from "./icons/ChevronDown";
import { WalletAvatar } from "./WalletAvatar";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAddress, setChain } from "../reducers/accountReducer";
import {
  useConnectedAccount,
  useDomain,
  useProfileImage,
} from "../hooks/useAccount";
import { useNavigate, Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
export default function RainbowKitCustomConnectButtonMobile({
  profileImage,
  domain,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleCollapse = () => {
    const navBarTarget = document.getElementById("dropdown-sticky-mobile");
    navBarTarget.classList.toggle("hidden");
  };

  const { disconnect } = useDisconnect();
  const { switchNetwork } = useSwitchNetwork();

  const walletClasses =
    "box-shadow-custom bg-mnkz-tan w-full px-4 py-2 rounded-full text-lg hover:text-white hover:cursor-pointer hover:bg-black md:mx-6 right-0 my-4 disabled:bg-gray-300 duration-150 transition";

  const dispatch = useDispatch();
  const connectedAccount = useConnectedAccount();

  const account = useAccount();

  const onClickDisconnect = (address) => {
    setIsDropdownOpen(false);
    disconnect();
  };

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const connected = mounted && account && chain;

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <div className="px-2 flex md:justify-end items-center">
                    <div className="flex justify-center items-center border-1 rounded-lg">
                      <button
                        class={walletClasses}
                        onClick={openConnectModal}
                        type="button"
                      >
                        Connect Wallet
                      </button>
                    </div>
                  </div>
                );
              }

              if (chain.unsupported || chain.id !== getTargetNetwork().id) {
                return (
                  <button
                    class="box-shadow-custom bg-mnkz-red w-full px-4 py-2 rounded-full text-lg hover:text-white hover:cursor-pointer md:mx-6 right-0 my-4 disabled:bg-gray-300 duration-150 transition"
                    onClick={() => switchNetwork?.(getTargetNetwork().id)}
                  >
                    <span className="whitespace-nowrap">
                      Switch to <span>{getTargetNetwork().name}</span>
                    </span>
                  </button>
                );
              }

              if (connectedAccount?.address !== account.address) {
                dispatch(setAddress(account.address));
                dispatch(setChain(chain.id));
              }

              return (
                <>
                  <button
                    id="dropdownDividerButtonMobile"
                    class="box-shadow-custom bg-mnkz-tan w-full px-4 py-2 rounded-full text-lg hover:text-white hover:cursor-pointer hover:bg-black md:mx-6 right-0 my-4 disabled:bg-gray-300 duration-150 transition"
                    type="button"
                    onClick={() => toggleCollapse()}
                  >
                    <div class="flex flex-row justify-center items-center">
                      <WalletAvatar
                        image={
                          profileImage ||
                          `${process.env.PUBLIC_URL}/images/monkeez-logo-with-bg.png`
                        }
                      />
                      <span className="ml-2 mr-1">{account?.displayName}</span>
                      <ChevronDownIcon direction={"down"} />
                    </div>
                  </button>

                  <div
                    id="dropdown-sticky-mobile"
                    class="box-shadow-custom absolute hidden top-[75px] z-10 bg-mnkz-tan divide-y border-black border-2 border-solid divide-black rounded w-[90%]"
                  >
                    <ul
                      class="text-xl font-bold text-black"
                      aria-labelledby="dropdownDividerButtonMobile"
                    >
                      <li>
                        <Link
                          to={`/zungle?selected=Monkeez`}
                          class="p-2 mx-1 text-black flex flex-row justify-center my-1 hover:bg-black hover:cursor-pointer hover:text-white rounded"
                        >
                          Monkeez
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/zungle?selected=Zoogz`}
                          class="p-2 mx-1 text-black flex flex-row justify-center my-1 hover:bg-black hover:cursor-pointer hover:text-white rounded"
                        >
                          Zoogz
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/accounts/${account.address}`}
                          class="p-2 mx-1 text-black flex flex-row justify-center my-1 hover:bg-black hover:cursor-pointer hover:text-white rounded"
                        >
                          Profile
                        </Link>
                      </li>
                    </ul>
                    <div class="">
                      <div
                        class="font-bold text-xl p-2 mx-1 text-black flex flex-row justify-center my-1 hover:bg-black hover:cursor-pointer hover:text-white rounded"
                        onClick={() => onClickDisconnect(account?.address)}
                      >
                        Disconnect
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
}
