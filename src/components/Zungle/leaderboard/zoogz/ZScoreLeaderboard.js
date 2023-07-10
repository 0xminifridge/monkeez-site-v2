import { useZscoreLeaderboard } from "../../../../hooks/useAccount";
import { useEffect } from "react";
import ZScoreLeaderboardItem from "./ZScoreLeaderboardItem";
import LoadingSpinner from "../../../LoadingSpinner";
import { useSelector } from "react-redux";

export default function ZScoreLeaderboard() {
  const { isLoading, fetchAndSet, fetchAndAdd } = useZscoreLeaderboard();

  const data = useSelector((state) => state.zscoreLeaderboard.items);
  const lastId = useSelector((state) => state.zscoreLeaderboard.lastVisibleId);

  const handleScroll = (e) => {
    const bottom =
      parseInt(e.target.scrollHeight - e.target.scrollTop) ===
      e.target.clientHeight;
    if (bottom && !isLoading) {
      fetchAndAdd(lastId);
    }
  };

  useEffect(() => {
    fetchAndSet(null);
  }, []);

  return (
    <div
      class="overflow-y-auto py-2 h-[71vh] border-0 border-black border-solid border-b-4"
      onScroll={(event) => handleScroll(event)}
    >
      {data?.map((item, index) => {
        return <ZScoreLeaderboardItem key={index} item={item} index={index} />;
      })}
      {isLoading && (
        <div class="flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
