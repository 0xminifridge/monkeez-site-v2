import { getMonkeezStakerContract } from "../utils/contracts";

export async function claimForMonkeez(ids, signer) {
  let tx,
    error = null;
  try {
    const contract = await getMonkeezStakerContract(signer);
    tx = await contract.claimTokens(ids);
    let hash = tx.hash;
  } catch (err) {
    console.error(err);
  }
}

export async function getStakedInfo(id) {
  let stakedTs, claimable;
  try {
    const contract = await getMonkeezStakerContract();
    stakedTs = await contract.stakedMonkeez(id);
    claimable = await contract.tokensToClaim(id);
  } catch (err) {
    console.error(err);
  }

  return { stakedTs, claimable };
}
