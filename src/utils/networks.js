import ZungleConfig from "../zungle.config";
import * as chains from "wagmi/chains";

export const NETWORKS_EXTRA_DATA = {
  [chains.avalanche.id]: {
    RPC_URL: "https://api.avax.network/ext/bc/C/rpc",
    EXPLORER_URL: "https://snowtrace.io",
    MONKEEZ_CONTRACT_ADDRESS: "0xb42d0f524564cafe2a47ca3331221903eda83b3c",
    ZOOGZ_CONTRACT_ADDRESS: "0xeed9ca646491aac79abb6a74961f9d4d6dc7cf4e",
    MNKZ_CONTRACT_ADDRESS: "0xeFdD9a1B91f164Ea5Ca973eFCe0096fE3f97645a",
    MONKEEZ_STAKER_CONTRACT_ADDRESS:
      "0x86d54fcb535377ceb78ca3667b6d4af6da5d6911",
    ZUNGLE_ITEM_SHOP_CONTRACT_ADDRESS:
      "0xE82B343Be44E595C974a9b8807C84E8B946fAeb1",
    ZOOG_LEVELER_CONTRACT_ADDRESS: "0xd74c6751df248106c9dc57c2f07fd19f37111807",
    ZOOG_BATTLER_CONTRACT_ADDRESS: "0xCEBd816e7F322EA1587BA0A5aF2f59285a099431",
    ZOOG_ENERGY_STORE_CONTRACT_ADDRESS:
      "0x5E69293f614D24172E4A5a904FFF8Da216394c0c",
    CRATEZ_CONTRACT_ADDRESS: "0xfd4c4E3E57dDe23bD198e0aE5ECC6bF560D0d009",
    LINK_TOKEN_CONTRACT_ADDRESS: "0x5947BB275c521040051D82396192181b413227A3",
    CAMPFIRE_USERNAMES_CONTRACT_ADDRESS:
      "0x44dd88c210c2052171165573368e13ecde5d9ae7",
    LOG_ENABLED: true,
  },
  [chains.avalancheFuji.id]: {
    RPC_URL: "https://rpc.ankr.com/avalanche_fuji",
    EXPLORER_URL: "https://testnet.snowtrace.io",
    MONKEEZ_CONTRACT_ADDRESS: "",
    ZOOGZ_CONTRACT_ADDRESS: "",
    MNKZ_CONTRACT_ADDRESS: "",
    MONKEEZ_STAKER_CONTRACT_ADDRESS: "",
    ZUNGLE_ITEM_SHOP_CONTRACT_ADDRESS: "",
    ZOOG_LEVELER_CONTRACT_ADDRESS: "",
    ZOOG_BATTLER_CONTRACT_ADDRESS: "",
    CRATEZ_CONTRACT_ADDRESS: "",
    LOG_ENABLED: true,
  },
};

export function getTargetNetwork() {
  const configuredNetwork = ZungleConfig.targetNetwork;

  return {
    ...configuredNetwork,
    ...NETWORKS_EXTRA_DATA[configuredNetwork.id],
  };
}
