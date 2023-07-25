import { getTargetNetwork } from "../utils/networks";
import { erc20ABI, useBalance } from "wagmi";
import { useState, useEffect } from "react";
import { getContract } from "../utils/contracts";
import { useDispatch } from "react-redux";
import {
  createError,
  createProcessing,
  createSuccess,
} from "../reducers/alertReducer";
import { useNetwork } from "wagmi";
import { useSigner } from "./useAccount";
import { parseErrorMessage } from "../utils/wallet";

export function useAvaxBalance(address) {
  const [balance, setBalance] = useState(null);
  const {
    data: fetchedBalanceData,
    isError,
    isLoading,
  } = useBalance({
    address,
    watch: true,
    chainId: getTargetNetwork().id,
  });

  useEffect(() => {
    if (fetchedBalanceData?.formatted) {
      setBalance(Number(fetchedBalanceData.formatted).toFixed(2));
    }
  }, [fetchedBalanceData]);

  return { balance, isError, isLoading };
}

export function useMnkzBalance(address) {
  const [balance, setBalance] = useState(0);
  const {
    data: fetchedBalanceData,
    isError,
    isLoading,
    error,
  } = useBalance({
    address,
    watch: false,
    token: "0xeFdD9a1B91f164Ea5Ca973eFCe0096fE3f97645a",
    // token: getTargetNetwork().MNKZ_CONTRACT_ADDRESS,
    chainId: getTargetNetwork().id,
  });

  useEffect(() => {
    if (fetchedBalanceData?.formatted) {
      setBalance(Number(fetchedBalanceData.formatted).toFixed(2));
    }
  }, [fetchedBalanceData]);

  return { balance, isError, isLoading };
}

export function useLinkBalance(address) {
  const [balance, setBalance] = useState(0);
  const {
    data: fetchedBalanceData,
    isError,
    isLoading,
  } = useBalance({
    address,
    watch: true,
    token: getTargetNetwork().LINK_TOKEN_CONTRACT_ADDRESS,
    chainId: getTargetNetwork().id,
  });

  useEffect(() => {
    if (fetchedBalanceData?.formatted) {
      setBalance(Number(fetchedBalanceData.formatted).toFixed(2));
    }
  }, [fetchedBalanceData]);

  return { balance, isError, isLoading };
}

export function useAllowedBalance(account, contractAddress, spender) {
  const [allowance, setAllowance] = useState(0);

  const fetchData = async () => {
    try {
      const contract = await getContract(contractAddress, erc20ABI);
      const balanceAllowed = await contract.allowance(account, spender);
      if (balanceAllowed) {
        setAllowance(balanceAllowed);
      }
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, [account, contractAddress, spender]);

  return { allowance };
}

export function useApproveAllowance() {
  const [isMining, setIsMining] = useState(false);
  const [isError, setIsError] = useState(false);

  const { chain } = useNetwork();
  const configuredNetwork = getTargetNetwork();

  const signer = useSigner();

  const dispatch = useDispatch();

  const writeTx = async (contractAddress, spender, balance) => {
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
      setIsError(false);

      const contract = await getContract(contractAddress, erc20ABI, signer);
      let tx = await contract.approve(spender, balance);

      let hash = tx.hash;
      dispatch(createProcessing(hash));
      await tx.wait();
      dispatch(createSuccess("Balance approved"));
    } catch (err) {
      setIsError(true);
      console.error(err);
      dispatch(createError(parseErrorMessage(err)));
      throw err;
    } finally {
      setIsMining(false);
    }
  };

  return { writeTx, isMining, isError };
}
