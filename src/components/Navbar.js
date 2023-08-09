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
import { Button, Navbar, Dropdown } from "flowbite-react";
import NavLink from "./NavLink";
import { WalletAvatar } from "./WalletAvatar";
import { parseHash } from "../utils/wallet";
import { ChevronDownIcon } from "./icons/ChevronDown";
import RainbowKitCustomConnectButtonMobile from "./RainbowKitCustomConnectButtonMobile";

export function SiteNavbar() {
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
    {
      title: "Mint",
      path: "/mint",
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
  const { domain } = useDomain(connectedAccount?.address);

  const { balance: mnkzBalance } = useMnkzBalance(connectedAccount?.address);
  const [open, setOpen] = useState(false);

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
    setOpen(!open);
    // const navBarTarget = document.getElementById("navbar-sticky");
    // navBarTarget.classList.toggle("hidden");
    // navBarTarget.classList.toggle("nav-transition");
  };

  const currentAddress = useSelector((state) => state.account.address);

  const { profileImage } = useProfileImage(currentAddress);

  return (
    <>
      <nav class="bg-mnkz-blue sticky w-full z-[11] top-0 left-0 border-b-4 border-black px-4 md:px-0">
        <div class="container m-auto">
          <div class="flex flex-wrap items-center justify-between mx-auto">
            <div class="flex flex-row relative">
              <Link to="home">
                <img
                  src={`${process.env.PUBLIC_URL}/images/logos/monkeez-logo.png`}
                  alt="Monkeez"
                  class="w-20 aspect-square block hover:opacity-80"
                />
              </Link>
              <ClaimButton
                account={connectedAccount?.address}
                mnkzBalance={mnkzBalance}
                claimableBalance={tokensClaimable}
                disabled={isLoading}
                monkeezIds={monkeezIds}
              />
              <img
                src={`${process.env.PUBLIC_URL}/images/monkeez/octopus.png`}
                alt="Monkeez"
                class={`absolute ${
                  open ? "-bottom-[18px]" : "-bottom-[18px]"
                } lg:-bottom-[18px] -right-16 w-16 aspect-square block`}
              />
            </div>

            <div class="flex lg:order-2 items-center">
              <div class="hidden md:flex">
                <RainbowKitCustomConnectButton
                  profileImage={profileImage}
                  domain={domain}
                />
              </div>

              <button
                // data-collapse-toggle="navbar-sticky"
                type="button"
                class="box-shadow-custom ml-2 inline-flex items-center p-2 text-sm text-black rounded-lg lg:hidden hover:border-white hover:text-white "
                // aria-controls="navbar-sticky"
                aria-expanded="false"
                onClick={() => toggleCollapse()}
              >
                <span class="sr-only">Open main menu</span>
                <HamburgerMenuIcon />
              </button>
            </div>
            <div
              class={`${
                open
                  ? "border-t-4 border-black border-solid w-full lg:border-0"
                  : "hidden"
              } items-center justify-between w-full lg:flex lg:w-auto lg:order-1`}
              id="navbar-sticky"
            >
              {/* <ul class="flex flex-col p-4 mt-4 rounded-lg lg:flex-row lg:space-x-8 lg:mt-0 lg:text-sm lg:font-medium list-none"> */}

              <ul class="flex flex-col p-4 lg:p-0 mt-4 font-medium lg:flex-row md:mt-0">
                {NavLinks.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link
                        target={item.target}
                        to={item.path}
                        class="group block py-2 pr-4 pl-3 text-black font-bold text-xl rounded lg:rounded-none lg:bg-transparent hover:text-white"
                        aria-current="page"
                        onClick={() => toggleCollapse()}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
                <div class="flex md:hidden">
                  <RainbowKitCustomConnectButtonMobile
                    profileImage={profileImage}
                    domain={domain}
                  />
                </div>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
