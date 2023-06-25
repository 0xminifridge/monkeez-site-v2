import { useState, useEffect } from "react";
import { getItem } from "../contracts/zungleItemShop";
import { useSelector, useDispatch } from "react-redux";
import { replaceAll, setCartItems } from "../reducers/itemShopReducer";
import { log } from "../helpers/console-logger";
import { getZungleItemShopContract } from "../utils/contracts";
import { useNetwork } from "wagmi";
import { getTargetNetwork } from "../utils/networks";
import { useSigner } from "./useAccount";
import {
  createError,
  createProcessing,
  createSuccess,
} from "../reducers/alertReducer";
import { parseErrorMessage } from "../utils/wallet";
import { useZungleItems } from "./useItems";

export function useShopItems() {
  const [shopItems, setShopItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const itemShopData = useSelector((state) => state.itemShop);

  const typeIds = [1, 2, 3, 4];

  let fetchData = async () => {
    setIsLoading(true);
    try {
      if (itemShopData.hasFetched) {
        setShopItems(itemShopData.items);
      } else {
        const itemList = [];
        for (const id of typeIds) {
          let item = await getItem(id);
          if (Object.keys(item).length !== 0) {
            itemList.push(item);
          }
        }
        setShopItems(itemList);
        if (itemList) {
          dispatch(
            replaceAll({
              items: itemList,
              hasFetched: true,
              isLoading: false,
            })
          );
          log("ITEMS: dispatched items");
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { shopItems, isLoading };
}

export function usePurchaseItems() {
  const [isMining, setIsMining] = useState(false);

  const { chain } = useNetwork();
  const configuredNetwork = getTargetNetwork();

  const signer = useSigner();

  const dispatch = useDispatch();

  const { fetchData: fetchItems } = useZungleItems();

  const writeTx = async (ids, amounts) => {
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

      const contract = await getZungleItemShopContract(signer);
      let tx = await contract.batchBuyItemsFromShop(ids, amounts);
      let hash = tx.hash;
      dispatch(createProcessing(hash));
      await tx.wait();
      dispatch(createSuccess("Items purchased successfully"));
      dispatch(setCartItems([]));
      await fetchItems();
    } catch (err) {
      console.error(err);
      dispatch(createError(parseErrorMessage(err)));
    } finally {
      setIsMining(false);
    }
  };

  return { writeTx, isMining };
}
