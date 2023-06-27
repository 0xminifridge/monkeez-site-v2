import logo from "./logo.svg";
import "./App.css";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
  coinbaseWallet,
  wallets,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { avalanche, avalancheFuji } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { RouterProvider } from "react-router-dom";
import { router } from "./components/routes";
import store from "./store";
import { Provider } from "react-redux";

const projectId = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID;

const { chains, publicClient } = configureChains(
  [
    avalanche,
    ...(process.env.REACT_APP_ENABLE_TESTNETS ? [avalancheFuji] : []),
  ],
  [publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ projectId, chains }),
    ],
  },
  {
    groupName: "Other",
    wallets: [
      rainbowWallet({ projectId, chains }),
      coinbaseWallet({ chains, appName: "Monkeez" }),
      walletConnectWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
