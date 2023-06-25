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
export default function RainbowKitCustomConnectButton({
  profileImage,
  domain,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { disconnect } = useDisconnect();
  const { switchNetwork } = useSwitchNetwork();

  const walletClasses =
    "bg-mnkz-tan w-full px-4 py-2 rounded-full text-lg hover:text-white hover:cursor-pointer hover:bg-black mx-6 right-0 my-4 disabled:bg-gray-300 duration-150 transition";

  const dispatch = useDispatch();
  const connectedAccount = useConnectedAccount();

  const account = useAccount();
  console.log(account, account?.address);

  const onClickDisconnect = (address) => {
    // if (connectedAccount?.address?.toLowerCase() === address?.toLowerCase()) {
    //   console.log("clearing");
    //   dispatch(setAddress(null));
    // }

    setIsDropdownOpen(false);
    disconnect();
  };

  useEffect(() => {
    console.log("address", connectedAccount?.address);
  }, [connectedAccount]);

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
        console.log("connected", connected, mounted);

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <div className="px-2 flex justify-end items-center">
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
                    class="bg-mnkz-red w-full px-4 py-2 rounded-full text-lg hover:text-white hover:cursor-pointer mx-6 right-0 my-4 disabled:bg-gray-300 duration-150 transition"
                    onClick={() => switchNetwork?.(getTargetNetwork().id)}
                  >
                    <span className="whitespace-nowrap">
                      Switch to <span>{getTargetNetwork().name}</span>
                    </span>
                  </button>
                );
              }

              if (connectedAccount?.address !== account.address) {
                console.log("setting", connectedAccount, account);
                dispatch(setAddress(account.address));
                dispatch(setChain(chain.id));
              }

              return (
                <>
                  {isDropdownOpen && (
                    <div className="block lg:hidden bg-mnkz-tan border-black border-solid border-2 duration-500 group-hover:visible absolute top-[75px] w-[280px] md:w-[200px] right-12 md:right-32 rounded-md">
                      <Link
                        class="p-2 mx-1 text-black flex flex-row justify-center my-1 hover:bg-black hover:cursor-pointer hover:text-white rounded"
                        to={`/zungle?selected=Monkeez`}
                      >
                        <span class="text-xl font-bold">Monkeez</span>
                      </Link>
                      <Link
                        class="p-2 mx-1 text-black flex flex-row justify-center my-1 hover:bg-black hover:cursor-pointer hover:text-white rounded"
                        to={`/zungle?selected=Zoogz`}
                        // onClick={() => navigate(`/zungle?selected=Zoogz`)}
                      >
                        <span class="text-xl font-bold">Zoogz</span>
                      </Link>
                      <Link
                        class="p-2 mx-1 text-black flex flex-row justify-center my-1 hover:bg-black hover:cursor-pointer hover:text-white rounded"
                        to={`/accounts/${account.address}`}
                      >
                        <span class="text-xl font-bold">Profile</span>
                      </Link>
                      <hr class="w-full border-black border-1 border-solid" />
                      <div
                        class="p-2 mx-1 flex flex-row justify-center my-1 hover:bg-black hover:cursor-pointer hover:text-white rounded"
                        onClick={() => onClickDisconnect()}
                      >
                        <span class="text-xl font-bold">Disconnect</span>
                      </div>
                    </div>
                  )}
                  {/* <Dropdown
                    class={`bg-mnkz-tan w-full rounded-full`}
                    label={
                      <div class="flex flex-row justify-center items-center">
                        <WalletAvatar
                          image={
                            profileImage ||
                            `${process.env.PUBLIC_URL}/images/monkeez-logo-with-bg.png`
                          }
                        />
                        <span className="ml-2 mr-1">{account.displayName}</span>
                        <ChevronDownIcon
                          direction={isDropdownOpen ? "up" : "down"}
                        />
                      </div>
                    }
                  >
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item>
                    <Dropdown.Item>Sign out</Dropdown.Item>
                  </Dropdown> */}

                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    type="button"
                    class={walletClasses}
                  >
                    <div class="flex flex-row justify-center items-center">
                      <WalletAvatar
                        image={
                          profileImage ||
                          `${process.env.PUBLIC_URL}/images/monkeez-logo-with-bg.png`
                        }
                      />
                      <span className="ml-2 mr-1">{account.displayName}</span>
                      <ChevronDownIcon
                        direction={isDropdownOpen ? "up" : "down"}
                      />
                    </div>
                  </button>
                  {isDropdownOpen && (
                    <div className="hidden lg:block bg-mnkz-tan border-black border-solid border-2 duration-500 group-hover:visible absolute top-[75px] w-[280px] md:w-[200px] right-12 md:right-32 rounded-md">
                      <Link
                        class="p-2 mx-1 text-black flex flex-row justify-center my-1 hover:bg-black hover:cursor-pointer hover:text-white rounded"
                        to={`/zungle?selected=Monkeez`}
                      >
                        <span class="text-xl font-bold">Monkeez</span>
                      </Link>
                      <Link
                        class="p-2 mx-1 text-black flex flex-row justify-center my-1 hover:bg-black hover:cursor-pointer hover:text-white rounded"
                        to={`/zungle?selected=Zoogz`}
                      >
                        <span class="text-xl font-bold">Zoogz</span>
                      </Link>
                      <Link
                        class="p-2 mx-1 text-black flex flex-row justify-center my-1 hover:bg-black hover:cursor-pointer hover:text-white rounded"
                        to={`/accounts/${account.address}`}
                      >
                        <span class="text-xl font-bold">Profile</span>
                      </Link>
                      <hr class="w-full border-black border-1 border-solid" />
                      <div
                        class="p-2 mx-1 flex flex-row justify-center my-1 hover:bg-black hover:cursor-pointer hover:text-white rounded"
                        onClick={() => onClickDisconnect(account.address)}
                      >
                        <span class="text-xl font-bold">Disconnect</span>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
}
