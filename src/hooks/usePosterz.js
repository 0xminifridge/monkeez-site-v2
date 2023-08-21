import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import { getTargetNetwork } from "../utils/networks";
import { useDispatch } from "react-redux";
import {
  createError,
  createProcessing,
  createSuccess,
} from "../reducers/alertReducer";
import { getZunglePosterzContract } from "../utils/contracts";
import { useSigner } from "./useAccount";
import { parseErrorMessage } from "../utils/wallet";

export function useBuyPoster() {
  const [isMining, setIsMining] = useState(false);

  const { chain } = useNetwork();
  const configuredNetwork = getTargetNetwork();

  const signer = useSigner();

  const dispatch = useDispatch();

  const writeTx = async (id, amount) => {
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

      const contract = await getZunglePosterzContract(signer);

      let tx = await contract.buyPoster(id, amount);
      if (tx) {
        let hash = tx.hash;
        dispatch(createProcessing(hash));
        await tx.wait();
        dispatch(createSuccess("Poster bought successfully"));
      }
    } catch (err) {
      console.error(err);
      const parsedError = parseErrorMessage(err);
      if (parsedError) {
        dispatch(createError(parseErrorMessage(err)));
      } else {
        dispatch(createError("Error in purchasing poster"));
      }
    } finally {
      setIsMining(false);
    }
  };

  return { writeTx, isMining };
}

export function usePosterSupply(id) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(0);

  const fetchData = async (id) => {
    try {
      setIsLoading(true);
      const contract = await getZunglePosterzContract();
      const totalSupply = await contract.totalSupply(id);
      const config = await contract.tokenToConfig(id);
      const maxSupply = config?.supply;
      if (totalSupply || maxSupply) {
        setData({
          totalSupply: Number(totalSupply),
          maxSupply: Number(maxSupply),
        });
      }
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
