import { MONKEEZ_CONTRACT_ABI } from "../abi/MonkeezABI";
import { ZOOGZ_CONTRACT_ABI } from "../abi/ZoogzABI";
import { MNKZ_CONTRACT_ABI } from "../abi/MNKZABI";
import { MONKEEZ_STAKER_CONTRACT_ABI } from "../abi/MonkeezStakerABI";
import { ZOOG_LEVELER_CONTRACT_ABI } from "../abi/ZoogLevelerABI";
import { ZUNGLE_ITEM_SHOP_CONTRACT_ABI } from "../abi/ZungleItemShopABI";
import { ZOOG_BATTLER_CONTRACT_ABI } from "../abi/ZoogBattlerABI";
import { ZOOG_ENERGY_STORE_CONTRACT_ABI } from "../abi/ZoogEnergyStoreABI";
import { CRATEZ_CONTRACT_ABI } from "../abi/CratezABI";
import { Contract, ethers } from "ethers";
import { erc20ABI } from "wagmi";
import { getTargetNetwork } from "./networks";
import { CAMPFIRE_USERNAMES_CONTRACT_ABI } from "../abi/CampfireUsernamesABI";

export async function getContract(address, abi, signer) {
  if (address && abi) {
    if (signer) {
      return new Contract(address, abi, signer);
    } else {
      return new Contract(
        address,
        abi,
        new ethers.JsonRpcProvider(getTargetNetwork().RPC_URL)
      );
    }
  }
}

export async function getMonkeezContract(signer) {
  return getContract(
    getTargetNetwork().MONKEEZ_CONTRACT_ADDRESS,
    MONKEEZ_CONTRACT_ABI,
    signer
  );
}

export async function getMonkeezStakerContract(signer) {
  return getContract(
    getTargetNetwork().MONKEEZ_STAKER_CONTRACT_ADDRESS,
    MONKEEZ_STAKER_CONTRACT_ABI,
    signer
  );
}

export async function getZoogzContract(signer) {
  return getContract(
    getTargetNetwork().ZOOGZ_CONTRACT_ADDRESS,
    ZOOGZ_CONTRACT_ABI,
    signer
  );
}

export async function getZoogBattlerContract(signer) {
  return getContract(
    getTargetNetwork().ZOOG_BATTLER_CONTRACT_ADDRESS,
    ZOOG_BATTLER_CONTRACT_ABI,
    signer
  );
}

export async function getZoogLevelerContract(signer) {
  return getContract(
    getTargetNetwork().ZOOG_LEVELER_CONTRACT_ADDRESS,
    ZOOG_LEVELER_CONTRACT_ABI,
    signer
  );
}

export async function getZungleItemShopContract(signer) {
  return getContract(
    getTargetNetwork().ZUNGLE_ITEM_SHOP_CONTRACT_ADDRESS,
    ZUNGLE_ITEM_SHOP_CONTRACT_ABI,
    signer
  );
}

export async function getEnergyStoreContract(signer) {
  return getContract(
    getTargetNetwork().ZOOG_ENERGY_STORE_CONTRACT_ADDRESS,
    ZOOG_ENERGY_STORE_CONTRACT_ABI,
    signer
  );
}

export async function getMnkzContract(signer) {
  return getContract(
    getTargetNetwork().MNKZ_CONTRACT_ADDRESS,
    MNKZ_CONTRACT_ABI,
    signer
  );
}

export async function getLinkContract(signer) {
  return getContract(
    getTargetNetwork().LINK_TOKEN_CONTRACT_ADDRESS,
    erc20ABI,
    signer
  );
}

export async function getCratezContract(signer) {
  return getContract(
    getTargetNetwork().CRATEZ_CONTRACT_ADDRESS,
    CRATEZ_CONTRACT_ABI,
    signer
  );
}

export async function getCampfireUsernamesContract(signer) {
  return getContract(
    getTargetNetwork().CAMPFIRE_USERNAMES_CONTRACT_ADDRESS,
    CAMPFIRE_USERNAMES_CONTRACT_ABI,
    signer
  );
}
