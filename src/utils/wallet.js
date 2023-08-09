import { getTargetNetwork } from "./networks";
import { ethers } from "ethers";
import AVVY from "@avvy/client";
import { getCampfireUsernamesContract } from "./contracts";

export async function lookupDotAvax(address) {
  let domain,
    error = null;
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      getTargetNetwork().RPC_URL
    );
    const avvy = new AVVY(provider);
    const hash = await avvy.reverse(AVVY.RECORDS.EVM, address);
    if (hash) {
      const name = await hash.lookup();
      domain = name?.name;
    }
  } catch (err) {
    console.error(err);
    error = err;
  }

  return { domain, error };
}

export async function lookupDotFire(address) {
  let domain,
    error = null;
  try {
    const contract = await getCampfireUsernamesContract(
      new ethers.providers.JsonRpcProvider(getTargetNetwork().RPC_URL)
    );
    domain = await contract.usernameFor(address);
  } catch (err) {
    console.error(err);
    error = err;
  }

  return { domain, error };
}

export function parseHash(hash) {
  if (hash) {
    return hash?.substring(0, 5) + "..." + hash.substring(hash.length - 4);
  } else {
    return null;
  }
}

export function parseErrorMessage(err) {
  let parsedError;
  try {
    const list = err?.reason;

    parsedError = `${err?.code}: ${list}`;
  } catch (err) {
    console.error(err);
  }

  return parsedError;
}

export function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "Mil" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}
