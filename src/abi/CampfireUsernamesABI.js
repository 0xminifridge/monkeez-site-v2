export const CAMPFIRE_USERNAMES_CONTRACT_ABI = [
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "usernameFor",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
];
