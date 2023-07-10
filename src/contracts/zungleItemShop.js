import { ITEM_SHOP_TYPE_NAMES } from "../utils/collection-data";
import { getZungleItemShopContract } from "../utils/contracts";
import { getTargetNetwork } from "../utils/networks";
import { ethers } from "ethers";

export async function getItemDetails(typeId) {
  try {
    const contract = await getZungleItemShopContract(
      new ethers.providers.JsonRpcProvider(getTargetNetwork().RPC_URL)
    );
    if (await contract.validItemTypes(typeId)) {
      const itemDetails = await contract.typeToItem(typeId);
      return {
        id: typeId,
        price: Number(itemDetails.price),
        xp: Number(itemDetails.xpPoints),
        aggression: Number(itemDetails.aggression),
        toughness: Number(itemDetails.toughness),
        smarts: Number(itemDetails.smarts),
        vitality: Number(itemDetails.vitality),
      };
    }
  } catch (err) {
    console.error(err);
  }
  return {};
}

export async function getItem(typeId) {
  try {
    const itemDetails = await getItemDetails(typeId);
    if (Object.keys(itemDetails).length !== 0) {
      return {
        id: itemDetails["id"],
        name: ITEM_SHOP_TYPE_NAMES[typeId],
        price: itemDetails["price"],
        xp: itemDetails["xp"],
        aggression: itemDetails["aggression"],
        toughness: itemDetails["toughness"],
        smarts: itemDetails["smarts"],
        vitality: itemDetails["vitality"],
      };
    }
  } catch (err) {
    console.error(err);
  }
  return {};
}
