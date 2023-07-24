import { useEffect, useState } from "react";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setZoogzFilters } from "../../../reducers/filterReducer";

export default function ZoogFilter({ stat, filter, direction }) {
  const [filterDirection, setFilterDirection] = useState(null);

  const dispatch = useDispatch();

  const filterClick = () => {
    if (filterDirection === null) {
      setFilterDirection("up");
      dispatch(setZoogzFilters({ direction: "up", filter: stat }));
    } else if (filterDirection === "up") {
      setFilterDirection("down");
      dispatch(setZoogzFilters({ direction: "down", filter: stat }));
    } else if (filterDirection === "down") {
      setFilterDirection("up");
      dispatch(setZoogzFilters({ direction: "up", filter: stat }));
    }
  };

  useEffect(() => {
    if (filter !== stat) {
      setFilterDirection(null);
    }
  }, [filter]);

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
          src={statToImage[stat?.toLowerCase()]}
        />
        {filter === stat && (
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
