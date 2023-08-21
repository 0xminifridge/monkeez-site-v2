import { useAccount } from "wagmi";
import PosterCard from "./PosterCard";
import { PosterItems } from "./PosterConfig";
import { useMnkzBalance } from "../../../hooks/useAccountBalance";

export default function Posters() {
  const connectedAccount = useAccount();
  const mnkzBalance = useMnkzBalance(connectedAccount?.address);

  return (
    <div class="p-1 sm:py-5 justify-center flex">
      <div class="flex flex-col">
        <div class="flex flex-row m-auto justify-center items-center">
          <h1 class="m-auto text-[2.5rem] sm:text-[4rem] font-bold">
            Zungle Posterz
          </h1>
        </div>
        <div class="py-2 mb-2 grid auto-cols-max auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-auto gap-4 m-auto border-0  border-t-4 border-black border-solid">
          {PosterItems?.map((item, index) => {
            return (
              <PosterCard
                key={index}
                item={item}
                mnkzBalance={mnkzBalance?.balance}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
