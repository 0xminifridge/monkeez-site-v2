import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMonkeeForId, getMonkeezForAddress } from "../utils/firebase";
import { log } from "../helpers/console-logger";
import {
  replaceAll,
  setIsLoading,
  updateStakeInfo,
} from "../reducers/monkeezReducer";
import { getTargetNetwork } from "../utils/networks";
import { getMonkeezStakerContract } from "../utils/contracts";
import { useNetwork } from "wagmi";
import {
  createError,
  createProcessing,
  createSuccess,
} from "../reducers/alertReducer";
import { useSigner } from "./useAccount";
import { parseErrorMessage } from "../utils/wallet";
import { getStakedInfo } from "../contracts/monkeez";

export function useMonkeezForAddress(address) {
  // const [monkeez, setMonkeez] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const monkeezData = useSelector(
    (state) => state.monkeez[address?.toLowerCase()]
  );

  const dispatch = useDispatch();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      if (address) {
        dispatch(
          setIsLoading({ address: address?.toLowerCase(), isLoading: true })
        );
        // we need to fetch for the first time from db
        log("MONKEEZ: getting monkeez from db");
        const data = await getMonkeezForAddress(address);
        data.sort(function (a, b) {
          return parseFloat(a.id) - parseFloat(b.id);
        });

        if (data) {
          dispatch(
            replaceAll({
              items: data,
              hasFetched: true,
              isLoading: true,
              address: address?.toLowerCase(),
            })
          );
          log("MONKEEZ: dispatching monkeez");
        }
      }
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    } finally {
      dispatch(
        setIsLoading({ address: address?.toLowerCase(), isLoading: false })
      );
    }
  };

  useEffect(() => {
    if (address) {
      try {
        if (!monkeezData?.isLoading) {
          dispatch(
            setIsLoading({ address: address?.toLowerCase(), isLoading: true })
          );
          if (monkeezData?.hasFetched) {
            log("MONKEEZ: getting monkeez from store");
          } else {
            fetchData();
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        dispatch(
          setIsLoading({ address: address?.toLowerCase(), isLoading: false })
        );
      }
    }
  }, [address]);

  return {
    monkeez: monkeezData?.items,
    isLoading: monkeezData?.isLoading,
    fetchData,
  };
}

export function useMonkeeForId(id) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // get monkee from db
      const result = await getMonkeeForId(id);
      if (result) {
        const contract = await getMonkeezStakerContract();
        const stakedTs = await contract.stakedMonkeez(id);
        const claimable = await contract.tokensToClaim(id);

        const now = new Date();
        const stakeDate = new Date(Number(stakedTs) * 1000);
        const hoursStaked = Math.floor(Math.abs(now - stakeDate) / 36e5);

        result.startTs = Number(stakedTs);
        result.claimable = Number(claimable);
        result.hoursStaked = hoursStaked;
        result.completionPercentage = ((hoursStaked % 24) / 24) * 100;
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
      fetchData();
    }
  }, [id]);

  return { data, isLoading };
}

export function useStakedInfo(id) {
  const [stakedTimestamp, setStakedTimestamp] = useState(null);
  const [tokensClaimable, setTokensClaimable] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { stakedTs, claimable } = await getStakedInfo(id);
      setStakedTimestamp(Number(stakedTs));
      setTokensClaimable(Number(claimable));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return { stakedTimestamp, tokensClaimable, isLoading };
}

export function useStakeMonkeez() {
  const [isMining, setIsMining] = useState(false);

  const { chain } = useNetwork();
  const configuredNetwork = getTargetNetwork();

  const signer = useSigner();

  const dispatch = useDispatch();

  const { data: monkeeData } = useMonkeeForId();

  const writeTx = async (ids) => {
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

      const contract = await getMonkeezStakerContract(signer);
      let tx = await contract.stakeMonkeez(ids);

      let hash = tx.hash;
      dispatch(createProcessing(hash));
      await tx.wait();
      dispatch(createSuccess("Staked successfully"));
      // TOOD: add monkee to list
      for (const id of ids) {
        const stakedInfo = await getStakedInfo(id);
        const address = await signer?.getAddress();
        log(`MONKEEZ: dispatching stake updates for ${id}`);
        const nowEpoch = Math.floor(Date.now() / 1000);
        dispatch(
          updateStakeInfo({
            itemId: id,
            stakedTs: Number(nowEpoch),
            claimable: Number(0),
            address: address?.toLowerCase(),
          })
        );
      }
    } catch (err) {
      console.error(err);
      dispatch(createError(parseErrorMessage(err)));
    } finally {
      setIsMining(false);
    }
  };

  return { writeTx, isMining };
}

export function useUnstakeMonkeez() {
  const [isMining, setIsMining] = useState(false);

  const { chain } = useNetwork();
  const configuredNetwork = getTargetNetwork();

  const signer = useSigner();

  const dispatch = useDispatch();

  const writeTx = async (ids) => {
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

      const contract = await getMonkeezStakerContract(signer);
      let tx = await contract.unstakeMonkeez(ids);

      let hash = tx.hash;
      dispatch(createProcessing(hash));
      await tx.wait();
      dispatch(createSuccess("Unstaked successfully"));
      // TODO: add monkee to list
      for (const id of ids) {
        const stakedInfo = await getStakedInfo(id);
        const address = await signer?.getAddress();
        log(`MONKEEZ: dispatching unstake updates for ${id}`);
        dispatch(
          updateStakeInfo({
            itemId: id,
            stakedTs: Number(0),
            claimable: Number(0),
            address: address?.toLowerCase(),
          })
        );
      }
    } catch (err) {
      console.error(err);
      dispatch(createError(parseErrorMessage(err)));
    } finally {
      setIsMining(false);
    }
  };

  return { writeTx, isMining };
}
