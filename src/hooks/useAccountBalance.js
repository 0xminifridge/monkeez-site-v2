import { getTargetNetwork } from "../utils/networks";
import { useBalance } from "wagmi";
import { useState, useEffect } from "react";

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
  const [balance, setBalance] = useState(null);
  const {
    data: fetchedBalanceData,
    isError,
    isLoading,
  } = useBalance({
    address,
    watch: true,
    token: getTargetNetwork().MNKZ_CONTRACT_ADDRESS,
    chainId: getTargetNetwork().id,
  });

  useEffect(() => {
    if (fetchedBalanceData?.formatted) {
      setBalance(Number(fetchedBalanceData.formatted).toFixed(2));
    }
  }, [fetchedBalanceData, address]);

  return { balance, isError, isLoading };
}

export function useLinkBalance(address) {
  const [balance, setBalance] = useState(null);
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
