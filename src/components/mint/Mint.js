import { useAccount } from "wagmi";
import { useNetwork } from "wagmi";
import { getTargetNetwork } from "../../utils/networks";
import Authenticate from "../Authenticate";
import { useState, useEffect } from "react";
import { BsCheck } from "react-icons/bs";
import { HiX } from "react-icons/hi";
import {
  createError,
  createSuccess,
  createProcessing,
} from "../../reducers/alertReducer";
import { useDispatch } from "react-redux";
import RainbowKitCustomConnectButton from "../RainbowKitCustomConnectButton";
import { Tooltip } from "flowbite-react";
import { getContract } from "../../utils/contracts";
import { ZUNGLE_LANDZ_ABI } from "../../abi/ZungleLandzABI";
import { useSigner } from "../../hooks/useAccount";
import { keccak256 } from "ethers/lib/utils";
import MerkleTree from "merkletreejs";
import { SET_ONE, SET_TWO } from "./mintAddresses";
import { ethers } from "ethers";
import { useAvaxBalance } from "../../hooks/useAccountBalance";
import { AvaxIcon } from "../icons/TokenIcons";

export default function Mint({ title }) {
  const connectedAccount = useAccount();
  const { chain } = useNetwork();
  const [amount, setAmount] = useState(null);
  const [cost, setCost] = useState(2);
  const [saleState, setSaleState] = useState(1);
  const [allowedToMint, setAllowedToMint] = useState(true);
  const [whitelisted, setWhitelisted] = useState(false);
  const [isMining, setIsMining] = useState(false);
  const [remaining, setRemaining] = useState(1000);
  const [proof, setProof] = useState(null);
  const [options, setOptions] = useState([]);

  const { balance: avaxBalance } = useAvaxBalance(connectedAccount?.address);

  const dispatch = useDispatch();

  const handleSelectChange = (value) => {
    setAmount(value);
  };

  const setPrice = (price) => {
    const priceToSet = ethers.utils.formatEther(price.toString());
    console.log("setting price:", priceToSet);
    setCost(priceToSet);
  };

  const setSupply = async () => {
    const contract = await getContract(
      getTargetNetwork().ZUNGLE_LANDZ_CONTRACT_ADDRESS,
      ZUNGLE_LANDZ_ABI
    );

    const supply = await contract.totalSupply();

    setRemaining(1000 - Number(supply));
  };

  const handleOptions = async (saleState) => {
    try {
      const contract = await getContract(
        getTargetNetwork().ZUNGLE_LANDZ_CONTRACT_ADDRESS,
        ZUNGLE_LANDZ_ABI
      );
      let userMinted;

      if (connectedAccount?.address) {
        userMinted = await contract.minters(connectedAccount?.address);
      } else {
        userMinted = 0;
      }

      if (saleState === 1 || saleState === 2) {
        if (userMinted === 5) {
          setAllowedToMint(false);
        } else {
          const ops = [];
          for (var i = 0; i < 5 - userMinted; i++) {
            ops.push({ label: `${i + 1} Landz`, value: i + 1 });
          }
          setOptions(ops);
        }
      } else {
        const ops = [];
        for (var i = 0; i < 5; i++) {
          ops.push({ label: `${i + 1} Landz`, value: i + 1 });
        }
        setOptions(ops);
      }
      setAmount(null);
    } catch (err) {
      console.error(err);
    }
  };

  const getTree = (account, addresses) => {
    if (account) {
      const leafNodes = addresses.map((addr) => keccak256(addr));
      const merkleTree = new MerkleTree(leafNodes, keccak256, {
        sortPairs: true,
      });

      const root = merkleTree.getHexRoot();
      console.log("root", root);
      const leaf = keccak256(account);
      const proof = merkleTree.getHexProof(leaf);

      const isValid = merkleTree.verify(proof, leaf, root);

      return { isValid, proof };
    }
  };

  const signer = useSigner();

  useEffect(() => {
    const fetchData = async () => {
      // get contract
      const contract = await getContract(
        getTargetNetwork().ZUNGLE_LANDZ_CONTRACT_ADDRESS,
        ZUNGLE_LANDZ_ABI
      );

      setSupply();

      // check sale state of contract
      const mintState = await contract.mintState();
      setSaleState(mintState);

      // set maximum purchaseable for each phase
      // set is whitelisted
      if (mintState === 1) {
        const price = await contract.presalePrice();
        setPrice(price);
        // phase 1 - zscore
        const { isValid, proof } = getTree(connectedAccount?.address, SET_ONE);
        setAllowedToMint(isValid);
        setWhitelisted(isValid);
        setProof(proof);
      } else if (mintState === 2) {
        // phase 2 - monkeez holders
        const price = await contract.presalePrice();
        setPrice(price);

        const { isValid, proof } = getTree(connectedAccount?.address, SET_TWO);
        setAllowedToMint(isValid);
        setWhitelisted(isValid);
        setProof(proof);
      } else if (mintState === 3) {
        // phase 3 - public
        const price = await contract.tokenPrice();
        setPrice(price);
        setAllowedToMint(true);
        setWhitelisted(true);
      } else {
        setAllowedToMint(false);
      }
    };
    if (connectedAccount?.address) {
      fetchData();
    }
  }, [connectedAccount?.address]);

  useEffect(() => {
    const interval = setInterval(async () => {
      await setSupply();
    }, 5000);

    handleOptions(0);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    handleOptions(saleState);
  }, [saleState]);

  const onMintClicked = async () => {
    try {
      setIsMining(true);
      console.log("getting contract");
      const contract = await getContract(
        getTargetNetwork().ZUNGLE_LANDZ_CONTRACT_ADDRESS,
        ZUNGLE_LANDZ_ABI,
        signer
      );
      let tx;
      if (saleState === 1) {
        console.log("minting phase 1");
        tx = await contract.mintPhaseOne(amount, proof, {
          value: ethers.utils.parseEther(`${cost * amount}`),
        });
      } else if (saleState === 2) {
        console.log("minting phase 2");
        tx = await contract.mintPhaseTwo(amount, proof, {
          value: ethers.utils.parseEther(`${cost * amount}`),
        });
      } else {
        console.log("minting phase 3");
        tx = await contract.mint(amount, {
          value: ethers.utils.parseEther(`${cost * amount}`),
        });
      }

      let hash = tx.hash;
      dispatch(createProcessing(hash));
      await tx.wait();
      dispatch(createSuccess("Landz minted successfully"));
      handleOptions(saleState);
      setSupply();
    } catch (err) {
      console.error(err);
      dispatch(createError("Error minting Landz"));
    } finally {
      setIsMining(false);
    }
  };

  return (
    <div class="md:h-[100vh] flex justify-center items-center p-4">
      <div class="flex flex-col justify-center">
        <div class="bg-white border-4 border-black border-solid flex flex-col justify-center items-center p-4 rounded-xl box-shadow-custom">
          <div class="relative">
            <img
              src={`${process.env.PUBLIC_URL}/images/landz/landz.gif`}
              class="w-full max-w-[400px] aspect-square rounded-xl"
            />

            {whitelisted && (
              <div class="absolute top-2 left-2 px-4 py-2 box-shadow-custom bg-mnkz-wobo rounded-lg  flex flex-row justify-center items-center">
                <BsCheck />
                <span>Whitelisted</span>
              </div>
            )}
            {!whitelisted && (
              <div class="absolute top-2 left-2 px-4 py-2 box-shadow-custom bg-mnkz-red rounded-lg  flex flex-row justify-center items-center">
                <HiX />
                <span>Whitelisted</span>
              </div>
            )}

            <div class="absolute top-2 right-2 px-4 py-2 box-shadow-custom bg-mnkz-tan rounded-lg  flex flex-row justify-center items-center">
              <span>Mint Phase: {saleState}</span>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center my-1">
            <span class="text-3xl md:text-4xl font-bold">Zungle Landz</span>
            <span>Supply: {remaining}/1000</span>
            <span>Total Cost: {parseFloat(cost * amount).toFixed(1)} AVAX</span>
            {connectedAccount?.address &&
            getTargetNetwork()?.id === chain?.id ? (
              <>
                <select
                  id="quantity"
                  // value="Select Quantity"
                  class="border-black bg-mnkz-tan hover:text-white hover:bg-black hover:cursor-pointer w-full border-2 border-solid rounded-xl text-lg p-2.5 my-2 focus:border-black focus:ring-0"
                  onChange={(e) => handleSelectChange(e.target.value)}
                >
                  <option disabled hidden selected>
                    Select Quantity
                  </option>
                  {options?.map((item, index) => {
                    return (
                      <option key={index} value={item?.value} class="text-lg">
                        {item?.label}
                      </option>
                    );
                  })}
                </select>
                <button
                  class="bg-mnkz-tan w-full px-4 py-2 rounded-xl text-lg hover:text-white hover:cursor-pointer hover:bg-black right-0 disabled:bg-gray-300 duration-150 transition disabled:cursor-default disabled:text-gray-400 disabled:hover:text-gray-400"
                  disabled={
                    !amount ||
                    !allowedToMint ||
                    isMining ||
                    parseFloat(avaxBalance) < parseFloat(amount * cost) ||
                    saleState === 0
                  }
                  onClick={() => onMintClicked()}
                >
                  Mint {amount}
                </button>
              </>
            ) : (
              <>
                <div class="flex justify-center items-center">
                  <RainbowKitCustomConnectButton />
                </div>
              </>
            )}
          </div>
        </div>
        <div class="box-shadow-custom text-xl border-black border-solid border-4 my-2 rounded-xl bg-mnkz-xeba">
          <div class="p-2 m-2 border-white border-solid border-2 rounded-xl flex flex-col justify-center items-center ">
            <span class="text-2xl font-bold underline">Mint Phases</span>
            <span>Phase 1: Zungle Score +100</span>
            <span>Phase 2: Monkeez Holders</span>
            <span>Phase 3: Public Sale</span>
          </div>
        </div>
      </div>

      <div class="z-20 bg-white  border-black border-solid border-4 rounded-full bottom-2 md:bottom-4 right-4 md:right-6 w-auto fixed">
        <Tooltip content="Your AVAX balance">
          <div class="flex flex-row justify-center items-center p-3">
            <AvaxIcon />
            <span class="ml-1">{avaxBalance || 0}</span>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
