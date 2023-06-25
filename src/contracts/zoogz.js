import { getEnergyStoreContract } from "../utils/contracts";

export async function getEnergyInfo(id) {
  let data, error;
  try {
    const contract = await getEnergyStoreContract();
    const energyInfo = await contract.zoogEnergy(id);
    if (energyInfo) {
      data = {};
      const now = new Date();
      const energyDate = new Date(Number(energyInfo.lastTs) * 1000);
      const since = Math.floor(Math.abs(now - energyDate) / 36e5);
      let energyVal;

      if (since >= 24) {
        energyVal = 10;
      } else {
        energyVal = 10 - Number(energyInfo.energy);
      }

      data.energy = energyVal;
      data.energyTs = Number(energyInfo.lastTs);
    }
  } catch (err) {
    console.error(err);
  }

  return { data, error };
}
