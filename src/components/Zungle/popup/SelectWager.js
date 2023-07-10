import { useState, useEffect } from "react";
import { useApproveAllowance } from "../../../hooks/useAccountBalance";
import { getTargetNetwork } from "../../../utils/networks";
import { parseEther } from "viem";
import { useCreateBattle } from "../../../hooks/useBattles";
import { nFormatter } from "../../../utils/wallet";

export default function SelectWager({
  handleClose,
  mnkzBalance,
  mnkzAllowance,
  linkBalance,
  linkAllowance,
  selectedZoogId,
}) {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({});
  const [approveMnkz, setApproveMnkz] = useState(false);
  const [approveLink, setApproveLink] = useState(false);

  const { writeTx: approveAllowance, isMining } = useApproveAllowance();
  const { writeTx: createBattle, isMining: battleCreateMining } =
    useCreateBattle();

  const min = 5;
  const max = 1000;
  const linkToPlay = 0.02;

  useEffect(() => {
    if (parseFloat(formData["mnkz"]) > parseFloat(mnkzAllowance)) {
      // approve mnkz
      setApproveMnkz(true);
    }
    if (formData["isVRF"] && linkToPlay > parseFloat(linkAllowance)) {
      setApproveLink(true);
    }
  }, [formData]);

  const handleValidation = () => {
    let fields = formData;
    let errors = {};
    let formIsValid = true;

    // mnkz
    if (!fields["mnkz"]) {
      formIsValid = false;
      errors["mnkz"] = "Field is required";
    }

    if (typeof fields["mnkz"] !== "undefined") {
      if (fields["mnkz"] > max || fields["mnkz"] < min) {
        formIsValid = false;
        errors["mnkz"] = "Must be in range 5-1000";
      }
    }

    setFormErrors(errors);
    return formIsValid;
  };

  const handleUserInput = (e) => {
    let name = e.target.name;
    let value = name === "isVRF" ? e.target.checked : e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const isFormValid = handleValidation();

    if (isFormValid) {
      // valid case
      if (approveMnkz) {
        // approve mnkz
        await approveAllowance(
          getTargetNetwork().MNKZ_CONTRACT_ADDRESS,
          getTargetNetwork().ZOOG_BATTLER_CONTRACT_ADDRESS,
          parseEther(parseFloat(formData["mnkz"]))
        );
      }
      if (approveLink) {
        // approve link
        await approveAllowance(
          getTargetNetwork().LINK_TOKEN_CONTRACT_ADDRESS,
          getTargetNetwork().ZOOG_BATTLER_CONTRACT_ADDRESS,
          parseEther(linkBalance)
        );
      }
      await createBattle(
        selectedZoogId,
        parseEther(formData["mnkz"], "wei"),
        !formData["isVRF"]
      );
      handleClose();
    } else {
      console.log("error");
    }
  };

  return (
    <>
      <div class="flex flex-col justify-center items-center p-4 bg-gray-200 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 m-auto">Select Token Wager</h2>
        <div class="flex flex-row items-center">
          <img
            src={`${process.env.PUBLIC_URL}/images/mnkz-token.png`}
            class="w-[50px] lg:w-[100px]"
          />
          <span class="pl-1 pr-2">X</span>
          <img
            src={`${process.env.PUBLIC_URL}/images/icons/link.png`}
            class="w-[40px] lg:w-[80px]"
          />
        </div>
        <div>
          <form class="flex flex-col">
            <input
              class="h-10 appearance-none border-solid border-4 border-gray-400 rounded-lg bg-transparent w-[190px] text-gray-700 py-1 px-2 leading-tight focus:outline-none focus:ring-mnkz-blue"
              placeholder="$MNKZ"
              name="mnkz"
              type="number"
              pattern="[0-9]*"
              value={formData["mnkz"]}
              onChange={handleUserInput}
              onWheel={(e) => e.target.blur()}
            />
            <span class="text-mnkz-red text-xs m-auto">
              {formErrors["mnkz"]}
            </span>
            <div class="flex flex-row justify-center items-center hover:cursor-pointer mt-2">
              <input
                type="checkbox"
                id="isVRF"
                name="isVRF"
                value="isVRF"
                checked={formData["isVRF"]}
                onChange={handleUserInput}
                class="rounded"
              />
              <img
                src={`${process.env.PUBLIC_URL}/images/icons/link.png`}
                class="px-2 w-10"
              />
              <label class="hover:cursor-pointer" for="isVRF">
                <a
                  class="text-black hover:text-gray-500 hover:underline"
                  href="https://monkeeznft.medium.com/zoogz-battle-begins-7ccf1e81bab4"
                  target="_blank"
                >
                  Ignore VRF
                </a>
              </label>
            </div>
          </form>
        </div>
        <div class="w-[175px] bg-white border-solid border-4 border-gray-700 rounded-lg flex flex-col justify-center items-center mt-1 lg:mt-2 mb-1 px-4 py-2">
          <h3>Summary</h3>
          {/* VRF call */}
          <div class="flex flex-row justify-between items-center w-full">
            <span>VRF</span>
            <div class="flex flex-row justify-between items-center my-1">
              <img
                src={`${process.env.PUBLIC_URL}/images/icons/link.png`}
                class="w-5"
              />
              {formData["isVRF"] && <span>0</span>}
              {!formData["isVRF"] && <span>0.02</span>}
            </div>
          </div>
          {/* MNKZ wager */}
          <div class="flex flex-row justify-between items-center w-full">
            <span>MNKZ</span>
            <div class="flex flex-row justify-between items-center my-1">
              <img
                src={`${process.env.PUBLIC_URL}/images/mnkz-token.png`}
                class="w-5"
              />
              <span>{nFormatter(formData["mnkz"], 1) || 0}</span>
            </div>
          </div>
        </div>
        <div>
          <button
            class="p-2 border-black border-solid border-2 rounded-lg bg-mnkz-wobo hover:bg-mnkz-tan hover:text-white disabled:bg-gray-300 disabled:text-gray-400"
            onClick={() => handleSubmit()}
            disabled={
              Object.keys(formErrors) > 0 ||
              isMining ||
              parseFloat(mnkzBalance) < formData["mnkz"] ||
              (!formData["isVRF"] && parseFloat(linkBalance) < linkToPlay) ||
              battleCreateMining
            }
          >
            {approveMnkz && <span>Approve MNKZ</span>}
            {approveLink && <span>Approve LINK</span>}
            {!approveMnkz && !approveLink && <span>Submit</span>}
          </button>
        </div>
      </div>
    </>
  );
}
