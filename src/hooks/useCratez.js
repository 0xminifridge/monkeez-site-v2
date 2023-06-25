import { getCratezContract, getZoogzContract } from "../utils/contracts";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { replaceAll } from "../reducers/cratezReducer";
import { useSigner } from "./useAccount";
import { useNetwork } from "wagmi";
import { getTargetNetwork } from "../utils/networks";
import {
  createError,
  createProcessing,
  createSuccess,
} from "../reducers/alertReducer";
import { parseErrorMessage } from "../utils/wallet";
import { log } from "../helpers/console-logger";

export function useCratez(address) {
  const cratezData = useSelector((state) => state.cratez);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const fetchData = async (address) => {
    try {
      setIsLoading(true);
      if (address) {
        const contract = await getCratezContract();
        const balance = await contract.tokensOfOwner(address);
        if (balance) {
          dispatch(
            replaceAll({
              ids: balance.map((item) => {
                return Number(item);
              }),
              hasFetched: true,
              address: address,
            })
          );
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      try {
        setIsLoading(true);
        if (
          cratezData?.hasFetched &&
          cratezData?.address?.toLowerCase() === address?.toLowerCase()
        ) {
          log("CRATEZ: No need to fetch, pulling from store");
        } else {
          fetchData(address);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  }, [address]);

  return { data: cratezData.ids, isLoading, fetchData };
}

export function useOpenCratez() {
  const [isMining, setIsMining] = useState(false);

  const { chain } = useNetwork();
  const configuredNetwork = getTargetNetwork();

  const currentAddress = useSelector((state) => state.account.address);

  const { fetchData } = useCratez(currentAddress);

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
      const contract = await getZoogzContract(signer);
      let tx = await contract.openCratez(ids);
      let hash = tx.hash;
      dispatch(createProcessing(hash));
      await tx.wait();
      dispatch(createSuccess("Cratez opened successfully"));
      await fetchData(currentAddress);
    } catch (err) {
      console.error(err);
      dispatch(createError(parseErrorMessage(err)));
    } finally {
      setIsMining(false);
    }
  };

  return { writeTx, isMining };
}
