import { useEffect, useState } from "react";

export default function ZungleScore({ percentage, score, rank }) {
  //   const [percentage, setPercentage] = useState(45);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (percentage < 8) {
      setOffset(0);
      document.documentElement.style.setProperty(
        "--percentage-num",
        `${percentage}%`
      );
    } else if (percentage > 80) {
      setOffset(50);
      document.documentElement.style.setProperty(
        "--percentage-num",
        `${percentage - 18.75}%`
      );
    } else {
      setOffset(50);
      document.documentElement.style.setProperty(
        "--percentage-num",
        `${percentage - 10}%`
      );
    }
  }, [percentage]);

  if (!score) {
    return null;
  }

  return (
    <div>
      <div class="flex flex-row justify-between items-center">
        <h3>Zungle Score</h3>
        <h3>Rank #{rank}</h3>
      </div>

      <div class="w-full h-[4vh] flex flex-row justify-center items-center m-auto my-4 relative">
        <div
          class={` absolute z-[2] h-[50px] w-[100px] bg-mnkz-wobo rounded-lg border-black border-solid border-4 flex justify-center items-center`}
          style={{
            left: `calc(${percentage}% - ${offset}px)`,
            WebkitAnimation: "slide-right 2s ease-in-out forwards",
            animation: "slide-right 0.5s ease-in-out forwards",
          }}
        >
          <div class="flex flex-row justify-center items-end">
            <span class="text-2xl font-extrabold">{score}</span>
            <span class="text-xs pb-1">ZS</span>
            {/* <span class="text-xs">Rank #101</span> */}
          </div>
        </div>
        <div
          style={{
            height: "30px",
            width: "100%",
            backgroundColor: "#e0e0de",
            borderRadius: 50,
            border: "2px solid black",
          }}
        >
          <div
            class="sf-rounding"
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "#000",
              borderRadius: "inherit",
              textAlign: "right",
              overflow: "hidden",
            }}
          >
            <div
              class={`bg-[#B8E8FB]`}
              style={{
                height: "100%",
                display: "flex",
                width: `${percentage}%`,
                animation: "progress 0.5s ease-in-out forwards",
              }}
            >
              {/* <span
                            style={{
                              padding: "5",
                              color: "black",
                              fontWeight: "bold",
                              margin: "auto",
                            }}
                          >
                            110zs
                          </span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
