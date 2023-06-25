import { useAccount } from "wagmi";
import { useMonkeezForAddress } from "../../../hooks/useMonkeez";
import LoadingSpinner from "../../LoadingSpinner";
import MonkeezCard from "./MonkeezCard";

export default function MyMonkeez() {
  const connectedAccount = useAccount();
  const { monkeez, isLoading } = useMonkeezForAddress(
    connectedAccount?.address
  );

  if (isLoading && !monkeez?.length) {
    return <LoadingSpinner />;
  }

  return (
    <div class="p-1 sm:py-5 justify-center flex">
      <div class="flex flex-col">
        <h1 class="m-auto text-[2.5rem] sm:text-[4rem] font-bold">
          My Monkeez
        </h1>

        {monkeez?.length > 0 ? (
          <div class="pt-2 mb-2 grid auto-cols-max grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 overflow-y-auto h-[75vh] gap-4 m-auto border-0 border-b-2 border-t-2 border-black border-solid">
            {monkeez?.map((item, index) => {
              return <MonkeezCard key={index} item={item} />;
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
