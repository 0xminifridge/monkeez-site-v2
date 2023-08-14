import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading, replaceAll } from "../reducers/landzReducer";
import { log } from "../helpers/console-logger";
import { getLandForId, getLandzForAddress } from "../utils/firebase";

export function useLandzForAddress(address) {
  // const [monkeez, setMonkeez] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const landzData = useSelector((state) => state.landz[address?.toLowerCase()]);

  const dispatch = useDispatch();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      if (address) {
        dispatch(
          setIsLoading({ address: address?.toLowerCase(), isLoading: true })
        );
        // we need to fetch for the first time from db
        log("LANDZ: getting landz from db");
        const data = await getLandzForAddress(address);
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
          log("LANDZ: dispatching landz");
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
        if (!landzData?.isLoading) {
          dispatch(
            setIsLoading({ address: address?.toLowerCase(), isLoading: true })
          );
          if (landzData?.hasFetched) {
            log("LANDZ: getting landz from store");
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
    data: landzData?.items,
    isLoading: landzData?.isLoading,
    fetchData,
  };
}

export function useLandForId(id) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // get land from db
      const result = await getLandForId(id);

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
