import RainbowKitCustomConnectButton from "./RainbowKitCustomConnectButton";
import { Link } from "react-router-dom";
import { HamburgerMenuIcon } from "./icons/HamburgerMenuIcon";
import { GITBOOK_LINK } from "../utils/socials";
import {
  useConnectedAccount,
  useDomain,
  useProfileImage,
} from "../hooks/useAccount";
import { useSelector, useDispatch } from "react-redux";
import {
  useAvaxBalance,
  useMnkzBalance,
  useLinkBalance,
} from "../hooks/useAccountBalance";
import { useMonkeezForAddress } from "../hooks/useMonkeez";
import { useClaimableBalance } from "../hooks/useMnkz";
import ClaimButton from "./ClaimButton";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

export function Navbar() {
  const NavLinks = [
    {
      title: "Home",
      path: "/home",
      target: "",
    },
    {
      title: "Docs",
      path: GITBOOK_LINK,
      target: "_blank",
    },
    {
      title: "NFTs",
      path: "/collections",
      target: "",
    },
    {
      title: "Zungle",
      path: "/zungle",
      target: "",
    },
    // {
    //   title: "Ticketz",
    //   path: "/ticketz",
    //   cName: "nav-links",
    //   target: "",
    // },
  ];

  const connectedAccount = useAccount();
  const { balance: mnkzBalance } = useMnkzBalance(connectedAccount?.address);

  const { monkeez, isLoading: monkeezLoading } = useMonkeezForAddress(
    connectedAccount?.address
  );

  const [monkeezIds, setMonkeezIds] = useState([]);

  useEffect(() => {
    if (!monkeezLoading) {
      setMonkeezIds(
        monkeez?.map(function (item) {
          return item.id;
        })
      );
    }
  }, [monkeez, monkeezLoading]);

  const { tokensClaimable, isLoading } = useClaimableBalance(
    monkeezIds,
    connectedAccount?.address
  );

  const toggleCollapse = () => {
    const navBarTarget = document.getElementById("navbar-sticky");
    navBarTarget.classList.toggle("hidden");
    navBarTarget.classList.toggle("nav-transition");
  };

  const currentAddress = useSelector((state) => state.account.address);

  const { profileImage } = useProfileImage(currentAddress);

  return (
    <>
      <nav class="bg-mnkz-blue sticky w-full z-[11] top-0 left-0 border-b-4 border-black ">
        <div class="flex flex-wrap items-center justify-between mx-auto px-2 container">
          <div class="flex flex-row">
            <Link to="home">
              <img
                src={`${process.env.PUBLIC_URL}/images/logos/monkeez-logo.png`}
                alt="Monkeez"
                class="w-20 aspect-square block"
              />
            </Link>
            <ClaimButton
              account={connectedAccount?.address}
              mnkzBalance={mnkzBalance}
              claimableBalance={tokensClaimable}
              disabled={isLoading}
              monkeezIds={monkeezIds}
            />
          </div>

          <div class="flex lg:order-2">
            <div class="hidden lg:flex">
              <RainbowKitCustomConnectButton profileImage={profileImage} />
            </div>

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              class="inline-flex items-center p-2 text-sm text-black rounded-lg lg:hidden hover:bg-black hover:text-white my-4"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <HamburgerMenuIcon />
            </button>
          </div>
          <div
            class="items-center justify-center hidden w-full lg:flex lg:w-auto lg:order-1 flex-grow duration-500"
            id="navbar-sticky"
          >
            <ul class="flex flex-col p-4 mt-4 rounded-lg lg:flex-row lg:space-x-8 lg:mt-0 lg:text-sm lg:font-medium list-none">
              {NavLinks.map((item, index) => {
                return (
                  <li key={index}>
                    <Link
                      target={item.target}
                      to={item.path}
                      class="group block py-2 pr-4 pl-3 text-black font-bold text-xl rounded lg:rounded-none lg:bg-transparent lg:p-0 hover:text-white"
                      aria-current="page"
                      onClick={() => toggleCollapse()}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
              <div class="flex lg:hidden">
                <RainbowKitCustomConnectButton />
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
