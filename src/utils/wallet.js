import { getTargetNetwork } from "./networks";
import { ethers } from "ethers";
import AVVY from "@avvy/client";
import { getCampfireUsernamesContract } from "./contracts";

export async function lookupDotAvax(address) {
  let domain,
    error = null;
  try {
    const provider = new ethers.JsonRpcProvider(getTargetNetwork().RPC_URL);
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
      new ethers.JsonRpcProvider(getTargetNetwork().RPC_URL)
    );
    domain = await contract.usernameFor(address);
  } catch (err) {
    console.error(err);
    error = err;
  }

  return { domain, error };
}

export function parseHash(hash) {
  return hash?.substring(0, 5) + "..." + hash.substring(hash.length - 4);
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
