export default function LoadingSpinner() {
  return (
    <>
      <div class="flex justify-center items-center h-full">
        <div class="flex flex-col items-center justify-center">
          {/* <img src="./images/sad-monkee.png" class="w-[260px] m-auto" /> */}
          <svg
            class="m-auto bg-transparent block text-mnkz-tan"
            width="200px"
            height="200px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <circle
              cx="50"
              cy="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              r="35"
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
