import { useAccount } from "wagmi";
import { useLandzForAddress } from "../../../hooks/useLandz";
import LoadingSpinner from "../../LoadingSpinner";
import LandzCard from "./LandzCard";

export default function MyLandz() {
  const connectedAccount = useAccount();
  const { data, isLoading } = useLandzForAddress(connectedAccount?.address);
  console.log(data);

  if (isLoading && !data?.length) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div class="p-1 sm:py-5 justify-center flex">
        <div class="flex flex-col">
          <div class="flex flex-row m-auto justify-center items-center">
            <h1 class="m-auto text-[2.5rem] sm:text-[4rem] font-bold">
              My Landz
            </h1>
          </div>
          {data?.length > 0 ? (
            <div class="py-2 mb-2 grid auto-cols-max auto-rows-max grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 overflow-y-auto h-[77vh] gap-4 m-auto border-0 border-b-4 border-t-4 border-black border-solid">
              {data?.map((item, index) => {
                return <LandzCard key={index} item={item} />;
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
    </>
  );
}
