import { useEffect, useState } from "react";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";

export default function LeaderboardFilters({
  stat,
  filterStat,
  setFilterStat,
  direction,
  setDirection,
}) {
  const [filterDirection, setFilterDirection] = useState(direction);

  const filterClick = () => {
    if (filterStat.toLowerCase() === stat.toLowerCase()) {
      if (direction === "up") {
        setDirection("down");
      } else {
        setDirection("up");
      }
    } else {
      setDirection("down");
      setFilterStat(stat);
    }
    setFilterStat(stat);
  };

  // useEffect(() => {
  //   if (filterStat !== stat) {
  //     setFilterDirection(null);
  //   }
  // }, [filterStat]);

  const statToImage = {
    totalLevel: `${process.env.PUBLIC_URL}/images/zoogz/stats/total-level.png`,
    aggression: `${process.env.PUBLIC_URL}/images/zoogz/stats/aggression.png`,
    toughness: `${process.env.PUBLIC_URL}/images/zoogz/stats/toughness.png`,
    smarts: `${process.env.PUBLIC_URL}/images/zoogz/stats/smarts.png`,
    vitality: `${process.env.PUBLIC_URL}/images/zoogz/stats/vitality.png`,
    wins: `${process.env.PUBLIC_URL}/images/zoogz/stats/trophy.png`,
  };

  return (
    <>
      <div
        class="hover:cursor-pointer hover:opacity-80 my-2 flex flex-row items-center overflow-x-auto"
        onClick={() => filterClick()}
      >
        <img
          class="w-6 h-6 md:w-10 md:h-10 aspect-square"
          src={statToImage[stat]}
        />
        {filterStat === stat && (
          <>
            {direction === "up" && <FaLongArrowAltUp class="w-4 h-6 md:h-10" />}
            {direction === "down" && (
              <FaLongArrowAltDown class="w-4 h-6 md:h-10" />
            )}
          </>
        )}
        {/* {!direction && <FaLongArrowAltDown class="w-4 h-10" />} */}
      </div>
    </>
  );
}
