import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AlertSpinner from "./AlertSpinner";
import { FaRegTimesCircle } from "react-icons/fa";
import XWithCircle from "./icons/XWithCircle";
import { getTargetNetwork } from "../utils/networks";
import { parseHash } from "../utils/wallet";

export default function Alert() {
  const { alerts } = useSelector((state) => state.alerts);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (alerts.length > 0) {
      setAlert(alerts[alerts.length - 1]);
      setShow(true);
      if (alerts[alerts.length - 1].type !== "processing") {
        setTimeout(() => {
          setShow(false);
        }, 3000);
      }
    }
  }, [alerts]);

  const onClose = () => {
    setShow(false);
  };

  const ENUM_STATUS_TYPES = {
    success: <AlertSpinner type={"success"} />,
    processing: <AlertSpinner type={"processing"} />,
    error: <AlertSpinner type={"error"} />,
  };

  if (show) {
    return (
      <div
        class="bg-white border-black border-solid border-4 z-[200] fixed bottom-1 sm:bottom-4 left-0 right-0 mx-1 sm:left-7 sm:right-auto w-full max-w-[365px] min-w-[200px]"
        style={{ "border-radius": "60px 20px 20px 60px" }}
      >
        <div class="flex flex-row items-center px-2 py-4 relative">
          <div class="flex bg-monkeez-img rounded-full overflow-hidden mr-2">
            {ENUM_STATUS_TYPES[alert?.type]}
          </div>
          <div
            class="absolute top-1 right-1 hover:cursor-pointer hover:text-mnkz-tan duration-150 transition"
            onClick={() => onClose()}
          >
            <XWithCircle color={"#000"} />
          </div>
          <div class="flex flex-col items-center right-0 overflow-hidden text-left relative">
            <div class="flex flex-col items-center left-0 sm:max-w-[250px] max-h-[75px] h-full w-full text-wrap">
              {alert?.type === "processing" && (
                <div class="flex flex-col text-xs">
                  <h3 class="text-mnkz-tan font-bold text-lg">Please Wait</h3>
                  <span>
                    Transaction{" "}
                    <a
                      class="text-mnkz-blue font-bold"
                      href={`${getTargetNetwork().EXPLORER_URL}/tx/${
                        alert?.message
                      }`}
                      target="_blank"
                    >
                      {parseHash(alert?.message)}
                    </a>{" "}
                    processing!
                  </span>
                </div>
              )}
              {alert?.type === "error" && (
                <div class="flex flex-col text-xs">
                  <h3 class="text-mnkz-red font-bold text-lg">Error</h3>
                  <span>{alert?.message}</span>
                </div>
              )}
              {alert?.type === "success" && (
                <div class="flex flex-col text-xs">
                  <h3 class="text-mnkz-wobo font-bold text-lg">Success!</h3>
                  <span>{alert?.message}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
