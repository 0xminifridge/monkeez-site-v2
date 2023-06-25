import { XP_FOR_LEVELS } from "../../utils/collection-data";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

export default function ProgressBar({ bgColor, xpPoints, level }) {
  const max =
    parseInt(level) === 99
      ? XP_FOR_LEVELS[parseInt(level)]
      : XP_FOR_LEVELS[parseInt(level) + 1];
  const min = XP_FOR_LEVELS[parseInt(level)];
  let completionPercentage;
  if (xpPoints === 0) {
    completionPercentage = 0;
  } else {
    completionPercentage =
      parseInt(level) === 99
        ? 100
        : parseInt(((xpPoints - min) / (max - min)) * 100);
  }

  const completionColor = completionPercentage < 25 ? "white" : "black";
  const barWidth = `${completionPercentage}%`;
  const containerWidth = "100%"; //width < 450 ? "150px" : "100%";

  const containerStyles = {
    height: 30,
    width: containerWidth,
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    border: "2px solid black",
    //   margin: 50
  };

  const fillerStyles = {
    height: "100%",
    width: containerWidth,
    backgroundColor: "#000",
    borderRadius: "inherit",
    textAlign: "right",
    overflow: "hidden",
  };

  const labelStyles = {
    // padding: 5,
    color: completionColor,
    fontWeight: "bold",
    margin: "auto",
  };

  const barFillStyles = {
    height: "100%",
    display: "flex",
    width: barWidth,
    animation: "progress 0.5s ease-in-out forwards",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles} class="sf-rounding">
        <div class={bgColor} style={barFillStyles}>
          <span style={labelStyles}>{completionPercentage}%</span>
        </div>
      </div>
    </div>
  );
}
