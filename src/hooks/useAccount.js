import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";
import {
  getDocumentForAddress,
  getMaxZungleScore,
  getRankForZungleScore,
} from "../utils/firebase";
import { getTargetNetwork } from "../utils/networks";
import { MONKEEZ_IMAGE_URL, ZOOGZ_IMAGE_URL } from "../utils/metadata";
import { lookupDotAvax, lookupDotFire } from "../utils/wallet";
import { setProfilePfp } from "../reducers/zungleReducer";

export function useConnectedAccount() {
  return useSelector((state) => state.account);
}

export function useSigner() {
  const [signer, setSigner] = useState(null);

  const fetchSigner = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const injectedSigner = await provider.getSigner();
    setSigner(injectedSigner);
  };

  useEffect(() => {
    fetchSigner();
  }, []);

  return signer;
}

export function useProfileImage(address) {
  const [imageUrl, setImageUrl] = useState(
    `${process.env.PUBLIC_URL}/images/monkeez-logo-with-bg.png`
  );

  const profilePfps = useSelector((state) => state.zungle.profilePfps);

  const dispatch = useDispatch();

  const fetchData = async () => {
    if (profilePfps[address]) {
      // setImageUrl(profilePfps[address]);
    } else {
      let accountDoc = await getDocumentForAddress(address);
      if (accountDoc && accountDoc.profileImage) {
        let contractAddress = accountDoc.profileImage.contractAddress;
        let tokenId = accountDoc.profileImage.tokenId;

        let pfpUrl;

        if (
          contractAddress?.toLowerCase() ===
          getTargetNetwork().MONKEEZ_CONTRACT_ADDRESS.toLowerCase()
        ) {
          pfpUrl = `${MONKEEZ_IMAGE_URL}/${tokenId}.png`;
        } else if (
          contractAddress?.toLowerCase() ===
          getTargetNetwork().ZOOGZ_CONTRACT_ADDRESS.toLowerCase()
        ) {
          pfpUrl = `${ZOOGZ_IMAGE_URL}/${tokenId}.png`;
        }

        if (pfpUrl) {
          setImageUrl(pfpUrl);
          dispatch(
            setProfilePfp({
              address: address,
              url: pfpUrl,
            })
          );
        }
      }
    }
  };

  useEffect(() => {
    if (address) {
      fetchData();
    }
  }, [address]);

  return { profileImage: profilePfps[address] };
}

export function useDomain(address) {
  const [domain, setDomain] = useState(address);

  const fetchUsername = async () => {
    try {
      const { domain: avvyDomain, error: avvyError } = await lookupDotAvax(
        address
      );
      const { domain: fireDomain, error: fireError } = await lookupDotFire(
        address
      );
      if (avvyDomain) {
        setDomain(avvyDomain);
      } else if (fireDomain) {
        setDomain(fireDomain);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (address) {
      fetchUsername();
    }
  }, [address]);

  return { domain };
}

export function useParsedAddress(address) {
  const [parsedAddress, setParsedAddress] = useState(null);

  useEffect(() => {
    if (address) {
      setParsedAddress(
        address?.substring(0, 5) +
          "..." +
          address?.substring(address.length - 4)
      );
    }
  }, [address]);

  return parsedAddress;
}

export function useZungleScore(address) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (address) => {
    try {
      setIsLoading(true);
      const accountDoc = await getDocumentForAddress(address.toLowerCase());
      if (accountDoc && accountDoc.zScore) {
        setData(accountDoc.zScore);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      fetchData(address);
    }
  }, [address]);

  return { data, isLoading };
}

export function useMaxZungleScore() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const score = await getMaxZungleScore();
      setData(score);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading };
}

export function useZungleScoreRank(score) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (score) => {
    try {
      setIsLoading(true);
      const rank = await getRankForZungleScore(score);
      if (rank) {
        setData(rank);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (score !== undefined && score !== null) {
      fetchData(score);
    }
  }, [score]);

  return { data, isLoading };
}
