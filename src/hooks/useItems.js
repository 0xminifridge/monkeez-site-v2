import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getZungleItemShopContract } from "../utils/contracts";
import { ITEM_SHOP_TYPES, ZUNGLE_ITEM_DATA } from "../utils/collection-data";
import { replaceAll } from "../reducers/zungleItemReducer";
import { log } from "../helpers/console-logger";

export function useZungleItems(address) {
  const [isLoading, setIsLoading] = useState(false);
  const zungleItems = useSelector((state) => state.zungleItems);

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const contract = await getZungleItemShopContract();
      let itemList = [];
      for (const id of ITEM_SHOP_TYPES) {
        let typeBalance = Number(await contract.balanceOf(address, id));
        let itemDetails = ZUNGLE_ITEM_DATA?.filter((obj) => {
          return obj.id === id;
        });

        if (typeBalance > 0) {
          let shallow = Object.assign({}, itemDetails[0]);
          shallow.amount = typeBalance;
          itemList.push(...Array(typeBalance).fill(shallow));
        }
      }
      if (itemList?.length > 0) {
        dispatch(
          replaceAll({
            items: itemList,
            hasFetched: true,
            address: address,
          })
        );
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
          !zungleItems?.hasFetched &&
          zungleItems?.address?.toLowerCase() === address?.toLowerCase()
        ) {
          log("ITEMS: already pulled, fetching from store");
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

  return { data: zungleItems.items, isLoading, fetchData };
}
