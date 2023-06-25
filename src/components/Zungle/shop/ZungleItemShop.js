import { useShopItems } from "../../../hooks/useItemShop";
import LoadingSpinner from "../../LoadingSpinner";
import ShopItemCard from "./ShopItemCard";

export default function ZungleItemShop() {
  const { shopItems, isLoading } = useShopItems();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div class="px-1 sm:py-5 justify-center flex">
      <div class="flex flex-col">
        <h1 class="m-auto text-[2.5rem] sm:text-[4rem] font-bold">
          Zungle Shop
        </h1>

        <div class="pt-2 mb-2 grid auto-cols-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 overflow-scroll h-[75vh] gap-4 m-auto">
          {shopItems.map((item, index) => {
            return <ShopItemCard key={index} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
