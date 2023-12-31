import * as chains from "wagmi/chains";

export const ZungleConfig = {
  // The network where your DApp lives in
  targetNetwork: chains.avalanche,

  // The interval at which your front-end polls the RPC servers for new data
  // it has no effect on the local network
  pollingInterval: 30000,

  // This is ours Alchemy's default API key.
  // You can get your own at https://dashboard.alchemyapi.io
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  // TODO: investigate and/or fix this
  // alchemyApiKey:
  //   process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ||
  //   "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF",

  /**
   * Auto connect:
   * 1. If the user was connected into a wallet before, on page reload reconnect automatically
   * 2. If user is not connected to any wallet:  On reload, connect to burner wallet if burnerWallet.enabled is true && burnerWallet.onlyLocal is false
   */
  walletAutoConnect: true,
};

export default ZungleConfig;
