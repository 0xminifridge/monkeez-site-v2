import { useSelector, useDispatch } from "react-redux";
import { log } from "../helpers/console-logger";
import { replaceAll } from "../reducers/mnkzReducer";
import { getMonkeezStakerContract } from "../utils/contracts";
import { useState, useEffect } from "react";
import { useSigner } from "./useAccount";
import { useNetwork } from "wagmi";
import { getTargetNetwork } from "../utils/networks";
import {
  createError,
  createProcessing,
  createSuccess,
} from "../reducers/alertReducer";
import { parseErrorMessage } from "../utils/wallet";

export function useClaimableBalance(ids, address) {
  const [tokensClaimable, setTokensClaimable] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const claimData = useSelector((state) => state.mnkz);

  const dispatch = useDispatch();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const contract = await getMonkeezStakerContract();
      const claimable = await contract.claimableTokens(ids);

      if (claimable) {
        setTokensClaimable(Number(claimable));
        dispatch(
          replaceAll({
            claimableBalance: Number(claimable),
            hasFetched: true,
            address: address,
          })
        );
        log("MNKZ: dispatched token balance");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (ids?.length > 0) {
      fetchData();
    }
  }, [ids]);

  return { tokensClaimable, isLoading };
}

export function useClaimForMonkeez(ids) {
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
      let tx = await contract.claimTokens(ids);
      let hash = tx.hash;
      dispatch(createProcessing(hash));
      await tx.wait();
      dispatch(createSuccess("Claimed successfully"));
    } catch (err) {
      console.error(err);
      dispatch(createError(parseErrorMessage(err)));
    } finally {
      setIsMining(false);
    }
  };

  return { writeTx, isMining };
}
