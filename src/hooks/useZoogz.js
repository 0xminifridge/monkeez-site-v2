import {
  getCompletedBattlesForZoog,
  getZoogForId,
  getZoogzForAddress,
} from "../utils/firebase";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { replaceAll } from "../reducers/zoogzReducer";
import { log } from "../helpers/console-logger";
import {
  queryZoogLeaderboardAscending,
  queryZoogLeaderboardDescending,
} from "../utils/firebase";
import {
  setItems,
  setLastId,
  addItems,
  clearLastId,
  setHasFetched,
} from "../reducers/zoogzLeaderboardReducer";
import { getZoogLevelerContract } from "../utils/contracts";
import { getEnergyInfo } from "../contracts/zoogz";
import { useSigner } from "./useAccount";
import { useNetwork } from "wagmi";
import { getTargetNetwork } from "../utils/networks";
import {
  createError,
  createProcessing,
  createSuccess,
} from "../reducers/alertReducer";
import { parseErrorMessage } from "../utils/wallet";

export function useZoogz(address) {
  const [zoogz, setZoogz] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const zoogData = useSelector((state) => state.zoogz);

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      if (address) {
        // we need to fetch for the first time from db
        log("ZOOGZ: getting zoogz from db");
        const data = await getZoogzForAddress(address);
        for (const item of data) {
          // get energy data
          const { data: energyInfo } = await getEnergyInfo(item.id);
          if (energyInfo) {
            item["energy"] = energyInfo.energy;
            item["energyTs"] = energyInfo.energyTs;
          }
        }
        data.sort(function (a, b) {
          return parseFloat(a.id) - parseFloat(b.id);
        });

        setZoogz(data);
        if (data) {
          dispatch(
            replaceAll({
              items: data,
              hasFetched: true,
              address: address,
            })
          );
          log("ZOOGZ: dispatched zoogz");
        }
      }
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      try {
        setIsLoading(true);
        if (
          zoogData?.hasFetched &&
          zoogData?.address?.toLowerCase() === address?.toLowerCase()
        ) {
          log("ZOOGZ: getting zoogz from store");
          // we've already fetched, so pull from redux global state
          setZoogz(zoogData.items);
          log("zoogz retrieved");
        } else {
          fetchData();
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  }, [address]);

  return { data: zoogData.items, isLoading, fetchData };
}

export function useZoogForId(id) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (id) => {
    // get item from db
    setIsLoading(true);
    try {
      const result = await getZoogForId(id);

      const { data: energyInfo } = await getEnergyInfo(id);

      if (energyInfo) {
        result["energy"] = energyInfo?.energy;
        result["energyTs"] = energyInfo?.energyTs;
      }
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return { data, isLoading, fetchData };
}

export function useZoogEnergy(id) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const energyInfo = await getEnergyInfo(id);

      setData(energyInfo);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return { data, isLoading };
}

export function useZoogXpInfo(id) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (id) => {
    try {
      setIsLoading(true);

      const contract = await getZoogLevelerContract();
      const xpStruct = await contract.idToXpStruct(id);
      let initialized = await contract.tokenInitialized(id);

      let obj = {
        aggressionXp: Number(xpStruct.aggressionXp),
        toughnessXp: Number(xpStruct.toughnessXp),
        smartsXp: Number(xpStruct.smartsXp),
        vitalityXp: Number(xpStruct.vitalityXp),
        lastUpgradedTs: Number(xpStruct.lastUpgradedTs),
        itemCount: Number(xpStruct.itemCount),
        initialized: initialized,
      };

      setData(obj);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  return { data, isLoading, fetchData };
}

export function useZoogBattleHistory(id) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    // get monkee from db
    setIsLoading(true);
    try {
      const result = await getCompletedBattlesForZoog(id);

      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return { data, isLoading };
}

export function useZoogzLeaderboard() {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const items = useSelector((state) => state.zoogzLeaderboard.items);
  const direction = useSelector((state) => state.zoogzLeaderboard.direction);
  const attribute = useSelector((state) => state.zoogzLeaderboard.filterStat);
  const lastId = useSelector((state) => state.zoogzLeaderboard.lastVisibleId);
  const hasFetched = useSelector((state) => state.zoogzLeaderboard.hasFetched);

  const clearAndStartOver = async () => {
    setIsLoading(true);
    dispatch(setItems([]));
    dispatch(clearLastId());
    await fetchData(null);
  };

  const fetchData = async (lastId) => {
    console.log("last", lastId);
    try {
      setIsLoading(true);
      if (direction === "up") {
        const { list } = await queryZoogLeaderboardAscending(attribute, lastId);
        dispatch(addItems(list));
        dispatch(setLastId(list[list?.length - 1]?.id));
        dispatch(setHasFetched(true));
      } else {
        const { list } = await queryZoogLeaderboardDescending(
          attribute,
          lastId
        );
        dispatch(addItems(list));

        dispatch(setLastId(list[list?.length - 1]?.id));
        dispatch(setHasFetched(true));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (direction && attribute && !isLoading) {
  //     console.log("clearing and starting over", direction, attribute, items);
  //     clearAndStartOver();
  //   }
  // }, [direction, attribute]);

  // useEffect(() => {
  //   if (!hasFetched && !isLoading) {
  //     console.log("fetching", hasFetched, items);
  //     fetchData();
  //   }
  // }, []);

  return { data: items, isLoading, lastId: lastId, fetchData };
}

export function useUpgradeZoog() {
  const [isMining, setIsMining] = useState(false);

  const { chain } = useNetwork();
  const configuredNetwork = getTargetNetwork();

  const signer = useSigner();

  const dispatch = useDispatch();

  const writeTx = async (id, statName, itemIds, itemAmounts) => {
    if (!chain?.id) {
      dispatch(createError("Please connect your wallet"));
      return;
    }
    if (chain?.id !== configuredNetwork.id) {
      dispatch(createError("Switch to AVAX C-Chain"));
      return;
    }
    try {
      setIsMining(true);

      const contract = await getZoogLevelerContract(signer);
      let tx, hash;

      switch (statName?.toLowerCase()) {
        case "aggression":
          tx = await contract.levelAggression(id, itemIds, itemAmounts);
          break;
        case "toughness":
          tx = await contract.levelToughness(id, itemIds, itemAmounts);
          break;
        case "smarts":
          tx = await contract.levelSmarts(id, itemIds, itemAmounts);
          break;
        case "vitality":
          tx = await contract.levelVitality(id, itemIds, itemAmounts);
          break;
        default:
          console.error(`Unsupported stat name: ${statName}`);
          dispatch(createError(`Unsupported stat name: ${statName}`));
          break;
      }
      if (tx) {
        hash = tx.hash;
        dispatch(createProcessing(hash));
        await tx.wait();
        dispatch(createSuccess("Zoog upgraded successfully"));
      }
    } catch (err) {
      console.error(err);
      const parsedError = parseErrorMessage(err);
      if (parsedError) {
        dispatch(createError(parseErrorMessage(err)));
      } else {
        dispatch(createError("Error in upgrading zoogz"));
      }
    } finally {
      setIsMining(false);
    }
  };

  return { writeTx, isMining };
}
