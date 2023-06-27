export default function AlertSpinner({ type }) {
  const ENUM_TYPE_COLORS = {
    success: "text-mnkz-wobo",
    processing: "text-mnkz-tan",
    error: "text-mnkz-red",
  };
  return (
    <>
      <div class="flex justify-center items-center h-full">
        <div class="flex flex-col items-center justify-center">
          <svg
            class={`m-auto bg-transparent block aspect-square w-[50px] md:w-[70px] ${ENUM_TYPE_COLORS[type]}`}
            // width="50px"
            // height="50px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <circle
              cx="50"
              cy="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="20"
              r="50"
              strokeDasharray="164.93361431346415 56.97787143782138"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="1s"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
              ></animateTransform>
            </circle>
          </svg>
        </div>
      </div>
    </>
  );
}
