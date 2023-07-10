import { useState, useEffect } from "react";
import XWithCircle from "../../icons/XWithCircle";
import { useZoogForId, useZoogz } from "../../../hooks/useZoogz";
import LoadingSpinner from "../../LoadingSpinner";
import {
  ZOOGZ_THUMBNAIL_URL_LG,
  ZOOGZ_THUMBNAIL_URL_SMALL,
} from "../../../utils/metadata";
import { ZOOG_STATS } from "../../../utils/collection-data";
import { nFormatter } from "../../../utils/wallet";
import { useApproveAllowance } from "../../../hooks/useAccountBalance";
import { getTargetNetwork } from "../../../utils/networks";
import { parseEther, parseUnits } from "viem";
import { useAcceptBattle, useCreateBattle } from "../../../hooks/useBattles";
import BattleCard from "./BattleCard";
import {
  BATTLE_MOVES,
  BATTLE_STAT_LOOKUP,
  BATTLE_STEP_SIZE,
} from "../../../utils/battle-data";
import Typewriter from "typewriter-effect";
import { formatBattleMove, getTypeAdvantage } from "../../../utils/battles";
import { MdPlayArrow } from "react-icons/md";
import BattleResults from "./BattleResults";
import { getZoogBattlerContract } from "../../../utils/contracts";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { updateItem } from "../../../reducers/zoogzReducer";

export default function AcceptBattle({
  isOpen,
  onClose,
  account,
  selectedInstance,
  mnkzBalance,
  mnkzAllowance,
  linkBalance,
  linkAllowance,
}) {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [selectedZoog, setSelectedZoog] = useState(null);
  const [resultConfig, setResultConfig] = useState(null);

  const { data, isLoading, fetchData } = useZoogz(account);

  const handleNextScreen = () => {
    setCurrentScreen(currentScreen + 1);
  };

  const handleClose = () => {
    setCurrentScreen(1);
    setResultConfig(null);
    onClose();
  };

  if (currentScreen === 2) {
    return (
      <BattlePrep
        handleNextScreen={handleNextScreen}
        selectedInstance={selectedInstance}
        selectedZoog={selectedZoog}
        isOpen={isOpen}
        handleClose={handleClose}
        mnkzBalance={mnkzBalance}
        mnkzAllowance={mnkzAllowance}
        linkBalance={linkAllowance}
        linkAllowance={linkAllowance}
        setResultConfig={setResultConfig}
      />
    );
  } else if (currentScreen === 3) {
    return (
      <BattleResults
        challenger={selectedZoog}
        opponent={selectedInstance?.zoog}
        resultConfig={resultConfig}
        handleClose={handleClose}
      />
    );
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-opacity-80 bg-black ${
        isOpen ? "" : "hidden"
      }`}
      onClick={handleClose}
    >
      <div
        className="bg-white border-4 border-solid border-black rounded-xl mx-4 w-[350px] sm:w-[450px] md:w-[550px] lg:w-[625px] shadow-lg p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          class="absolute top-2 left-2 hover:opacity-80 hover:cursor-pointer"
          onClick={handleClose}
        >
          <XWithCircle color={"#000"} />
        </div>
        {/* {currentScreen === 1 && (
          // must approve MNKZ to play
          <ApproveMNKZ handleNextScreen={handleNextScreen} />
        )}

        {currentScreen === 2 && (
          // must approve LINK to play
          <ApproveLINK handleNextScreen={handleNextScreen} />
        )} */}

        {currentScreen === 1 && (
          <SelectZoog
            handleNextScreen={handleNextScreen}
            isLoading={isLoading}
            data={data}
            setSelectedZoog={setSelectedZoog}
          />
        )}

        {currentScreen === 2 && (
          <BattlePrep
            handleNextScreen={handleNextScreen}
            selectedInstance={selectedInstance}
            selectedZoog={selectedZoog}
            mnkzBalance={mnkzBalance}
            mnkzAllowance={mnkzAllowance}
            linkBalance={linkAllowance}
            linkAllowance={linkAllowance}
          />
        )}
      </div>
    </div>
  );
}

export function SelectZoog({
  handleNextScreen,
  isLoading,
  data,
  setSelectedZoog,
}) {
  const selectZoog = (item) => {
    setSelectedZoog(item);
    handleNextScreen();
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (
    data?.length === 0 ||
    data?.filter((item) => item?.energy > 0)?.length === 0
  ) {
    return (
      <div class="flex flex-col items-center justify-center bg-gray-300 my-1 rounded-lg w-full max-w-[500px] m-auto">
        <img
          src={`${process.env.PUBLIC_URL}/images/logos/logo-black.png`}
          class="h-40 aspect-square"
        />
        <span>No Zoogz Available</span>
      </div>
    );
  }
  return (
    <div class="flex flex-col">
      <h2 className="text-2xl font-bold mb-4 m-auto">Select Zoog for Battle</h2>
      <div
        class={`grid grid-rows-1 grid-flow-col auto-cols-max gap-4 overflow-x-auto p-4 bg-gray-300 rounded-xl`}
      >
        {data
          ?.filter((item) => item?.energy > 0)
          ?.map((item, index) => {
            return (
              <div key={index} class="flex" onClick={() => selectZoog(item)}>
                <div class="overflow-hidden rounded-xl relative block border-4 border-solid border-black hover:border-mnkz-tan hover:cursor-pointer">
                  <span class="absolute md:text-sm top-1 left-1 bg-gray-300/50 rounded-lg px-2 py-1">
                    {item?.id}
                  </span>
                  <div class="absolute top-1 right-1 bg-gray-300/50 rounded-lg px-2 py-1 flex flex-row justify-center items-center">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/zoogz/stats/energy.png`}
                      class="w-4 h-4 aspect-square"
                    />
                    <span>{item?.energy}</span>
                  </div>

                  <img
                    src={`${ZOOGZ_THUMBNAIL_URL_LG}/${item?.id}.png`}
                    class="w-full max-w-[150px] min-w-[150px] aspect-square"
                  />
                  <div class="flex flex-row justify-between items-center px-4 py-2 bg-black text-white">
                    {ZOOG_STATS?.map((stat, index) => {
                      return (
                        <div class="flex flex-col justify-center">
                          <span>{item[stat?.toLowerCase()]}</span>
                          <img
                            src={`${
                              process.env.PUBLIC_URL
                            }/images/zoogz/stats/${stat?.toLowerCase()}.png`}
                            class="w-4 h-4 aspect-square"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* <span>{item?.id}</span> */}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export function BattlePrep({
  handleNextScreen,
  selectedZoog,
  selectedInstance,
  isOpen,
  handleClose,
  mnkzBalance,
  mnkzAllowance,
  linkBalance,
  linkAllowance,
  setResultConfig,
}) {
  const [entries, setEntries] = useState([]);
  const [battleStart, setBattleStart] = useState(false);
  const [approveMnkz, setApproveMnkz] = useState(false);
  const [approveLink, setApproveLink] = useState(false);

  const dispatch = useDispatch();

  const { fetchData: fetchZoog } = useZoogForId();

  const { writeTx: approveAllowance, isMining } = useApproveAllowance();
  const {
    writeTx: acceptBattle,
    isMining: battleMining,
    isError: battleError,
  } = useAcceptBattle();

  const maxMoves = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      if (battleStart) {
        if (entries.length < maxMoves) {
          const moveNumber = Math.floor(
            Math.random() *
              BATTLE_MOVES[selectedZoog?.type?.toLowerCase()].length
          );
          // true is you, false is opp
          const isPlayer = entries.length % 2 === 0;
          if (isPlayer) {
            const entryText = formatBattleMove(
              selectedZoog?.type,
              moveNumber,
              isPlayer
            );

            setEntries((prevEntries) => [
              ...prevEntries,
              { text: entryText, color: "text-mnkz-wobo" },
            ]);
          } else {
            const entryText = formatBattleMove(
              selectedInstance?.zoog?.type,
              moveNumber,
              isPlayer
            );

            setEntries((prevEntries) => [
              ...prevEntries,
              { text: entryText, color: "text-mnkz-red" },
            ]);
          }
        } else {
          clearInterval(interval);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [entries, battleStart]);

  const handleBattleStart = async () => {
    try {
      if (approveMnkz) {
        // approve mnkz
        await approveAllowance(
          getTargetNetwork().MNKZ_CONTRACT_ADDRESS,
          getTargetNetwork().ZOOG_BATTLER_CONTRACT_ADDRESS,
          parseEther(selectedInstance?.tokenAmt?.toString())
        );
        setApproveMnkz(false);
      }
      if (approveLink) {
        // approve link
        await approveAllowance(
          getTargetNetwork().LINK_TOKEN_CONTRACT_ADDRESS,
          getTargetNetwork().ZOOG_BATTLER_CONTRACT_ADDRESS,
          parseEther((0.02).toString())
        );

        setApproveLink(false);
      }

      console.log(
        !approveMnkz,
        !approveLink,
        parseFloat(mnkzBalance) > selectedInstance?.tokenAmt,
        selectedInstance?.isVRF,
        parseFloat(linkBalance) > 0.02
      );

      if (
        !approveMnkz &&
        !approveLink &&
        parseFloat(mnkzBalance) > selectedInstance?.tokenAmt
      ) {
        acceptBattle(
          selectedZoog?.id,
          selectedInstance?.id,
          selectedInstance?.isVRF
        );

        setBattleStart(true);
        // do contract stuff here

        const listenerContract = await getZoogBattlerContract(
          new ethers.providers.JsonRpcProvider(getTargetNetwork().RPC_URL)
        );

        listenerContract.on(
          "BattleDraw",
          async (
            battleIndex,
            challengerId,
            opponentId,
            tokenAmt,
            firstRoll,
            secondRoll,
            stat
          ) => {
            console.log("draw case", Number(battleIndex));
            if (Number(battleIndex) === selectedInstance?.id) {
              const config = {
                case: "draw",
                stat: BATTLE_STAT_LOOKUP[Number(stat)],
                challenger: {
                  diceRoll: Number(secondRoll),
                  statAdvantage: Math.floor(
                    selectedZoog[BATTLE_STAT_LOOKUP[Number(stat)]] /
                      BATTLE_STEP_SIZE
                  ),
                  typeAdvantage: getTypeAdvantage(
                    selectedZoog,
                    selectedInstance?.zoog
                  ),
                  tokens: Number(selectedInstance?.tokenAmt),
                },
                opponent: {
                  diceRoll: Number(firstRoll),
                  statAdvantage: Math.floor(
                    selectedInstance?.zoog[BATTLE_STAT_LOOKUP[Number(stat)]] /
                      BATTLE_STEP_SIZE
                  ),
                  typeAdvantage: getTypeAdvantage(
                    selectedInstance?.zoog,
                    selectedZoog
                  ),
                  tokens: Number(selectedInstance?.tokenAmt),
                },
              };
              setResultConfig(config);
              dispatch(updateItem(fetchZoog(selectedZoog?.id)));
              handleNextScreen();
            }
          }
        );

        listenerContract.on(
          "BattleWin",
          async (
            battleIndex,
            winnerId,
            tokenAmt,
            firstRoll,
            secondRoll,
            stat
          ) => {
            console.log("win case", Number(battleIndex));
            if (Number(battleIndex) === selectedInstance?.id) {
              let resultCase;
              let challengerTokens;
              let opponentTokens;
              if (Number(winnerId) === selectedZoog?.id) {
                resultCase = "win";
                challengerTokens = Number(selectedInstance?.tokenAmt) * 0.98;
                opponentTokens = Number(selectedInstance?.tokenAmt);
              } else {
                resultCase = "lose";
                challengerTokens = Number(selectedInstance?.tokenAmt);
                opponentTokens = Number(selectedInstance?.tokenAmt) * 0.98;
              }
              const config = {
                case: resultCase,
                stat: BATTLE_STAT_LOOKUP[Number(stat)],
                challenger: {
                  diceRoll: Number(secondRoll),
                  statAdvantage: Math.floor(
                    selectedZoog[BATTLE_STAT_LOOKUP[Number(stat)]] /
                      BATTLE_STEP_SIZE
                  ),
                  typeAdvantage: getTypeAdvantage(
                    selectedZoog,
                    selectedInstance?.zoog
                  ),
                  tokens: challengerTokens,
                },
                opponent: {
                  diceRoll: Number(firstRoll),
                  statAdvantage: Math.floor(
                    selectedInstance?.zoog[BATTLE_STAT_LOOKUP[Number(stat)]] /
                      BATTLE_STEP_SIZE
                  ),
                  typeAdvantage: getTypeAdvantage(
                    selectedInstance?.zoog,
                    selectedZoog
                  ),
                  tokens: opponentTokens,
                },
              };
              setResultConfig(config);
              dispatch(updateItem(fetchZoog(selectedZoog?.id)));
              handleNextScreen();
            }
          }
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  useEffect(() => {
    if (parseFloat(selectedInstance?.tokenAmt) > parseFloat(mnkzAllowance)) {
      // approve mnkz
      setApproveMnkz(true);
    }
    if (selectedInstance?.isVRF && 0.02 > parseFloat(linkAllowance)) {
      setApproveLink(true);
    }
  }, []);

  useEffect(() => {
    if (battleError) {
      console.log("battle error:", battleError);
      handleClose();
    }
  }, [battleError]);

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 bg-opacity-[0.95] bg-black ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div
          className=" mx-4 w-[350px] sm:w-[450px] md:w-[550px] lg:w-[625px] shadow-lg relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div class="h-full">
            {/* zoog cards */}
            {/* <div class="flex flex-row justify-center items-center text-white font-bold text-4xl">
              <img
                src={`${
                  process.env.PUBLIC_URL
                }/images/zoogz/types/${selectedZoog?.type?.toLowerCase()}.png`}
                class="w-full max-w-[50px] flip-h"
              />
              <img
                src={`${process.env.PUBLIC_URL}/images/zoogz/stats/sword-n-shield.png`}
                class="w-full max-w-[50px]"
              />
              <img
                src={`${
                  process.env.PUBLIC_URL
                }/images/zoogz/types/${selectedInstance?.zoog?.type?.toLowerCase()}.png`}
                class="w-full max-w-[50px]"
              />
            </div> */}
            <div class="flex flex-row justify-between items-center">
              {/* card one */}
              <div class="flex flex-col justify-center items-center">
                <span class="text-white text-xl font-bold">You</span>
                <BattleCard zoog={selectedZoog} />
              </div>

              <div class="flex flex-col justify-center items-center text-white">
                <img
                  src={`${process.env.PUBLIC_URL}/images/zoogz/stats/sword-n-shield.png`}
                  class="w-full max-w-[50px]"
                />
              </div>

              {/* card two */}
              <div class="flex flex-col justify-center items-center">
                <span class="text-white text-xl font-bold">Opponent</span>
                <BattleCard zoog={selectedInstance?.zoog} />
              </div>
            </div>
            <div class="flex flex-col items-center text-white my-4 ">
              <span class="font-bold text-2xl">Required</span>
              <div class="flex flex-row justify-center items-center border-gray-800 border-solid border-2 rounded-xl text-white px-4">
                <div class="flex flex-row justify-center items-center">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/mnkz-token.png`}
                    class="w-full max-w-[50px]"
                  />
                  <span
                    class={`${
                      parseFloat(mnkzBalance) >= selectedInstance?.tokenAmt
                        ? "text-mnkz-wobo"
                        : "text-mnkz-red"
                    }`}
                  >
                    {selectedInstance?.tokenAmt} MNKZ
                  </span>
                </div>
                {selectedInstance?.isVRF && (
                  <div class="px-4 flex flex-row justify-center items-center">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icons/link.png`}
                      class="w-full max-w-[35px]"
                    />
                    <span
                      class={`${
                        linkBalance >= 0.02 ? "text-mnkz-wobo" : "text-mnkz-red"
                      }`}
                    >
                      0.02 LINK
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div class="flex flex-col justify-center items-center text-black my-2">
              {battleStart && (
                <>
                  <span class="text-white animate-pulse">
                    Battle in Progress
                  </span>
                  <div class="flex flex-row justify-center items-center">
                    <button
                      class="bg-mnkz-wobo rounded-xl px-4 py-2 hover:bg-mnkz-tan m-1"
                      onClick={handleClose}
                    >
                      Hide
                    </button>
                  </div>
                </>
              )}
              {!battleStart && (
                <>
                  <span class="text-white">Ready to fight?</span>
                  <div class="flex flex-row justify-center items-center">
                    <button
                      class="bg-mnkz-wobo rounded-xl px-4 py-2 hover:bg-mnkz-tan m-1 disabled:bg-gray-300 disabled:text-gray-400"
                      onClick={handleBattleStart}
                      disabled={
                        parseFloat(mnkzBalance) < selectedInstance?.tokenAmt ||
                        (selectedInstance?.isVRF &&
                          parseFloat(linkBalance) < 0.02) ||
                        isMining ||
                        battleMining
                      }
                    >
                      {approveMnkz && <span>Approve MNKZ</span>}
                      {!approveMnkz && approveLink && <span>Approve LINK</span>}
                      {!approveMnkz && !approveLink && <span>Yes</span>}
                    </button>
                    <button
                      class="bg-mnkz-red rounded-xl px-4 py-2 hover:bg-mnkz-tan m-1"
                      onClick={handleClose}
                    >
                      No
                    </button>
                  </div>
                </>
              )}
            </div>
            <div
              class={`${
                battleStart ? "visible" : "invisible"
              } text-white flex flex-col justify-start overflow-y-scroll h-[150px] border-gray-800 border-solid border-2 rounded-xl p-4`}
            >
              <span class="text-white font-bold text-xl underline">
                Battle Log
              </span>
              {entries.map((entry, index) => (
                <div
                  key={index}
                  class={`${entry?.color} flex flex-row justify-start items-center`}
                >
                  <MdPlayArrow />
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .typeString(entry?.text)

                        .start();
                    }}
                    options={{
                      delay: 30,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
