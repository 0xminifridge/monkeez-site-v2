import { useAccount } from "wagmi";
import { useZoogz } from "../../../hooks/useZoogz";
import LoadingSpinner from "../../LoadingSpinner";
import ZoogzCard from "./ZoogzCard";

export default function MyZoogz() {
  const connectedAccount = useAccount();
  const { data, isLoading } = useZoogz(connectedAccount?.address);

  if (isLoading && !data?.length) {
    return <LoadingSpinner />;
  }

  return (
    <div class="p-1 sm:py-5 justify-center flex">
      <div class="flex flex-col">
        <h1 class="m-auto text-[2.5rem] sm:text-[4rem] font-bold">My Zoogz</h1>
        {data?.length > 0 ? (
          <div class="order-0 py-2 mb-2 grid auto-cols-max grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 overflow-scroll h-[75vh] gap-4 m-auto border-0 border-b-4 border-t-4 border-black border-solid">
            {data?.map((item, index) => {
              return <ZoogzCard key={index} item={item} />;
            })}
          </div>
        ) : (
          <div class="flex flex-col items-center justify-center bg-gray-300 m-1 rounded-lg">
            <img
              src={`${process.env.PUBLIC_URL}/images/logos/logo-black.png`}
              class="max-h-[350px] h-full aspect-square"
            />
            <span>No items available</span>
          </div>
        )}
      </div>
    </div>
  );
}
