import { useState, useEffect } from "react";
import XWithCircle from "../../icons/XWithCircle";
import { useZoogz } from "../../../hooks/useZoogz";
import SelectZoogForCreate from "./SelectZoogForCreate";
import SelectWager from "./SelectWager";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentState, setPrevState } from "../../../reducers/popupReducer";

/*
STATE LEGEND
1 - Select Zoog for Create
2 - Select Token Wager
3 - Select Zoog for Accept
*/

export default function ZunglePopup({
  isOpen,
  onClose,
  account,
  mnkzBalance,
  mnkzAllowance,
  linkBalance,
  linkAllowance,
}) {
  //   const [currentScreen, setCurrentScreen] = useState(1);
  const currentScreen = useSelector((state) => state.zunglePopup.currentState);
  const nextState = useSelector((state) => state.zunglePopup.nextState);
  const prevState = useSelector((state) => state.zunglePopup.prevState);
  const [selectedZoogId, setSelectedZoogId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("current:", currentScreen);
  }, [currentScreen]);

  const { data, isLoading, fetchData } = useZoogz(account);
  console.log(data, account);

  const handleNextScreen = () => {
    dispatch(setCurrentState(nextState));
    // setCurrentScreen(currentScreen + 1);
  };

  const handlePreviousScreen = () => {
    dispatch(setCurrentState(prevState));
  };

  const handleClose = () => {
    dispatch(setCurrentState(null));
  };

  console.log("returning", currentScreen);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-opacity-80 bg-black ${
        currentScreen ? "" : "hidden"
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
          <SelectZoogForCreate
            // handleNextScreen={dispatch(setCurrentState(nextState))}
            isLoading={isLoading}
            data={data}
            setSelectedZoogId={setSelectedZoogId}
          />
        )}

        {currentScreen === 2 && (
          <SelectWager
            handleClose={handleClose}
            account={account}
            mnkzBalance={mnkzBalance}
            mnkzAllowance={mnkzAllowance}
            linkBalance={linkAllowance}
            linkAllowance={linkAllowance}
            selectedZoogId={selectedZoogId}
          />
        )}
      </div>
    </div>
  );
}
