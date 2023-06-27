import React from "react";
import {
  DiscordIcon,
  InstagramIcon,
  MediumIcon,
  TwitterIcon,
} from "./icons/SocialIcons";
import {
  CD_LINK,
  DISCORD_LINK,
  GITBOOK_LINK,
  INSTAGRAM_LINK,
  MEDIUM_LINK,
  TWITTER_LINK,
} from "../utils/socials";
import { MONKEEZ_MARKET_DATA } from "../utils/markets";

export default function Footer() {
  const markets = [
    "Joepegs",
    "Campfire",
    "Salvor",
    "NFTrade",
    "Kalao",
    "OpenSea",
  ];

  return (
    <footer class="bg-mnkz-blue border-black border-0 md:border-t-4">
      <div class="mx-auto max-w-screen-lg p-4 py-6 lg:py-8 ">
        <div class="md:flex md:justify-between">
          <div class="mb-6 md:mb-0 mx-2">
            <a href="https://monkeez.io/" class="flex items-center ">
              <img
                src={`${process.env.PUBLIC_URL}/images/logos/logo-black.png`}
                class="h-16 mr-3"
                alt="Monkeez Logo"
              />
              <span class="self-center text-4xl font-semibold whitespace-nowrap text-black hover:text-white">
                Monkeez
              </span>
            </a>
          </div>
          <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4">
            <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Resources
              </h2>
              <ul class="text-gray-600 font-medium list-none">
                <li class="mb-4">
                  <a
                    href={GITBOOK_LINK}
                    target="_blank"
                    class="text-black hover:text-white"
                  >
                    Docs
                  </a>
                </li>
                <li class="mb-4">
                  <a
                    href="https://monkeez.gitbook.io/monkeez/monkeez/what-are-monkeez"
                    target="_blank"
                    class="text-black hover:text-white"
                  >
                    Monkeez
                  </a>
                </li>
                <li class="mb-4">
                  <a
                    href="https://monkeez.gitbook.io/monkeez/zoogz/what-are-zoogz"
                    target="_blank"
                    class="text-black hover:text-white"
                  >
                    Zoogz
                  </a>
                </li>
                <li class="mb-4">
                  <a
                    href="https://monkeez.gitbook.io/monkeez/monkeez/usdmnkz"
                    target="_blank"
                    class="text-black hover:text-white"
                  >
                    $MNKZ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Markets
              </h2>
              <ul class="text-gray-600 font-medium list-none">
                {markets.map((item, index) => {
                  return (
                    <li key={index} class="mb-4">
                      <a
                        href={MONKEEZ_MARKET_DATA[item]?.collections}
                        target="_blank"
                        class="text-black hover:text-white hover:cursor-pointer"
                      >
                        {item}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Connect
              </h2>
              <ul class="text-gray-600 font-medium list-none">
                <li class="mb-4">
                  <a
                    href={TWITTER_LINK}
                    target="_blank"
                    class="text-black hover:text-white "
                  >
                    Twitter
                  </a>
                </li>
                <li class="mb-4">
                  <a
                    href={DISCORD_LINK}
                    target="_blank"
                    class="text-black hover:text-white"
                  >
                    Discord
                  </a>
                </li>
                <li class="mb-4">
                  <a
                    href={INSTAGRAM_LINK}
                    target="_blank"
                    class="text-black hover:text-white"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={MEDIUM_LINK}
                    target="_blank"
                    class="text-black hover:text-white"
                  >
                    Medium
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Legal
              </h2>
              <ul class="text-gray-600 font-medium list-none">
                <li class="mb-4">
                  <a
                    href="https://monkeez.gitbook.io/monkeez/other/terms-of-service"
                    target="_blank"
                    class="text-black hover:text-white"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr class="my-6 border-black sm:mx-auto lg:my-8" />
        <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-black sm:text-center">
            © {new Date().getFullYear()}{" "}
            <a
              href={CD_LINK}
              target="_blank"
              class="text-black hover:text-white"
            >
              Catalyst Digital LLC
            </a>
            . All Rights Reserved.
          </span>
          <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a
              href={TWITTER_LINK}
              target="_blank"
              class="text-black hover:text-white"
            >
              <TwitterIcon />
              <span class="sr-only">Twitter page</span>
            </a>
            <a
              href={DISCORD_LINK}
              target="_blank"
              class="text-black hover:text-white"
            >
              <DiscordIcon />
              <span class="sr-only">Discord account</span>
            </a>

            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              class="text-black hover:text-white"
            >
              <InstagramIcon />
              <span class="sr-only">Instagram page</span>
            </a>
            <a
              href={MEDIUM_LINK}
              target="_blank"
              class="text-black hover:text-white"
            >
              <MediumIcon />
              <span class="sr-only">Medium page</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
