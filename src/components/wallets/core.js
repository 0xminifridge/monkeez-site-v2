import { getWalletConnectConnector } from "@rainbow-me/rainbowkit";

const LEARN_MORE_URL = "https://about.core.app/";

export const core = ({ projectId, chains }) => ({
  id: "core",
  name: "Core",
  iconUrl: "https://my-image.xyz",
  iconBackground: "#0c2f78",
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=com.avaxwallet",
    ios: "https://apps.apple.com/us/app/core-wallet/id6443685999",
    chrome:
      "https://chrome.google.com/webstore/detail/core-crypto-wallet-nft-ex/agoakfejjabomempkjlepdflaleeobhb",
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({ projectId, chains });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return uri;
        },
      },
      qrCode: {
        getUri: async () => (await connector.getProvider()).connector.uri,
        instructions: {
          learnMoreUrl: LEARN_MORE_URL,
          steps: [
            {
              description:
                "We recommend putting My Wallet on your home screen for faster access to your wallet.",
              step: "install",
              title: "Open the My Wallet app",
            },
            {
              description:
                "After you scan, a connection prompt will appear for you to connect your wallet.",
              step: "scan",
              title: "Tap the scan button",
            },
          ],
        },
      },
      extension: {
        getUri: async () => (await connector.getProvider()).connector.uri,
        instructions: {
          learnMoreUrl: LEARN_MORE_URL,
          steps: [
            {
              description:
                "We recommend pinning My Wallet to your taskbar for quicker access to your wallet.",
              step: "install",
              title: "Install the My Wallet extension",
            },
            {
              description:
                "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
              step: "create",
              title: "Create or Import a Wallet",
            },
            {
              description:
                "Once you set up your wallet, click below to refresh the browser and load up the extension.",
              step: "refresh",
              title: "Refresh your browser",
            },
          ],
        },
      },
    };
  },
});
