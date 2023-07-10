import { getLatestActiveBattles, queryZoogBattleLog } from "../utils/firebase";
import { useState, useEffect } from "react";
import { useNetwork } from "wagmi";
import { getTargetNetwork } from "../utils/networks";
import { useSigner } from "./useAccount";
import { useDispatch } from "react-redux";
import {
  createError,
  createProcessing,
  createSuccess,
} from "../reducers/alertReducer";
import { getContract, getZoogBattlerContract } from "../utils/contracts";
import { parseErrorMessage } from "../utils/wallet";

export function useActiveBattles() {
  const [data, setData] = useState([]);
  const [lastId, setLastId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAndSet = async (lastId) => {
    try {
      setIsLoading(true);
      const { battles } = await getLatestActiveBattles("created", lastId);
      if (battles) {
        setData(battles);
        setLastId(battles[battles.length - 1].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAndAdd = async (lastId) => {
    try {
      setIsLoading(true);
      const { battles } = await getLatestActiveBattles("created", lastId);
      if (battles) {
        setData([...data, ...battles]);
        setLastId(battles[battles.length - 1].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, lastId, isLoading, fetchAndSet, fetchAndAdd };
}

export function useBattleHistory() {
  const [data, setData] = useState([]);
  const [lastId, setLastId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAndSet = async (lastId) => {
    try {
      setIsLoading(true);
      const { data: history } = await queryZoogBattleLog(lastId);
      if (history) {
        setData(history);
        setLastId(history[history.length - 1].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAndAdd = async (lastId) => {
    try {
      setIsLoading(true);
      const { data: history } = await queryZoogBattleLog(lastId);
      if (history) {
        setData([...data, ...history]);
        setLastId(history[history.length - 1].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, lastId, isLoading, fetchAndSet, fetchAndAdd };
}

export function useCreateBattle() {
  const [isMining, setIsMining] = useState(false);

  const { chain } = useNetwork();
  const configuredNetwork = getTargetNetwork();

  const signer = useSigner();

  const dispatch = useDispatch();

  const writeTx = async (zoogId, tokens, isVrf) => {
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

      const contract = await getZoogBattlerContract(signer);
      console.log("zoogId", zoogId);
      console.log("tokens", tokens);
      console.log("isVRF", isVrf);
      let tx = await contract.createBattle(zoogId, tokens, isVrf);

      let hash = tx.hash;
      dispatch(createProcessing(hash));
      await tx.wait();
      dispatch(createSuccess("Battle created"));
    } catch (err) {
      console.error(err);
      dispatch(createError(parseErrorMessage(err)));
    } finally {
      setIsMining(false);
    }
  };

  return { writeTx, isMining };
}

export function useCancelBattle() {
  const [isMining, setIsMining] = useState(false);

  const { chain } = useNetwork();
  const configuredNetwork = getTargetNetwork();

  const signer = useSigner();

  const dispatch = useDispatch();

  const writeTx = async (zoogId) => {
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

      const contract = await getZoogBattlerContract(signer);

      let tx = await contract.cancelBattle(zoogId);

      let hash = tx.hash;
      dispatch(createProcessing(hash));
      await tx.wait();
      dispatch(createSuccess("Battle cancelled"));
    } catch (err) {
      console.error(err);
      dispatch(createError(parseErrorMessage(err)));
    } finally {
      setIsMining(false);
    }
  };

  return { writeTx, isMining };
}

export function useAcceptBattle() {
  const [isMining, setIsMining] = useState(false);
  const [isError, setIsError] = useState(false);

  const { chain } = useNetwork();
  const configuredNetwork = getTargetNetwork();

  const signer = useSigner();

  const dispatch = useDispatch();

  const writeTx = async (zoogId, battleInstanceId, isVrf) => {
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

      const contract = await getZoogBattlerContract(signer);
      let tx;
      console.log("vrf:", isVrf);
      if (isVrf) {
        console.log("processing vrf");
        tx = await contract.acceptBattleWithVRF(zoogId, battleInstanceId);
      } else {
        console.log("processing");
        tx = await contract.acceptBattle(zoogId, battleInstanceId);
        console.log("tx:", tx);
      }

      let hash = tx.hash;
      dispatch(createProcessing(hash));
      await tx.wait();
      dispatch(createSuccess("Battle submitted"));
    } catch (err) {
      console.error(err);
      setIsError(true);
      dispatch(createError(parseErrorMessage(err)));
    } finally {
      setIsMining(false);
    }
  };

  return { writeTx, isMining, isError };
}