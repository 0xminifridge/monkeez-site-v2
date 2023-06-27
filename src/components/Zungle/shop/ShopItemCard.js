import { useState } from "react";
import { ZUNGLE_ITEM_SHOP_IMAGE_URL } from "../../../utils/metadata";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../reducers/itemShopReducer";
import { usePurchaseItems } from "../../../hooks/useItemShop";

export default function ShopItemCard({ item }) {
  const [hovering, setHovering] = useState(false);
  const [amount, setAmount] = useState(1);

  const dispatch = useDispatch();

  const { writeTx: buyItemsFromShop, isMining } = usePurchaseItems();

  const increase = () => {
    setAmount(amount + 1);
  };

  const decrease = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const addItem = (item, amount) => {
    if (item) {
      let shallow = Object.assign({}, item);
      shallow["amount"] = amount;
      dispatch(addToCart(shallow));
    }
  };

  const buyNow = async () => {
    if (item) {
      await buyItemsFromShop([item?.id], [amount]);
    }
  };

  return (
    <div
      class={`bg-black border-4 relative rounded-2xl border-solid border-black hover:border-mnkz-tan hover:cursor-pointer w-full h-full max-h-[470px]`}
      //   onClick={() => navigate(`/monkeez/${item.id}`)}
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div class="inline-block overflow-hidden m-0 relative rounded-t-xl">
        <h3 class="absolute top-2 left-2 z-10 rounded-lg bg-gray-300/50 px-2 py-1 hidden sm:block">
          XP: {item.xp}
        </h3>
        <div class="absolute flex flex-row justify-center items-center top-2 right-2 mx-auto z-10 rounded-lg bg-gray-300/50 px-2 py-1 ">
          <img
            src={`${process.env.PUBLIC_URL}/images/mnkz-token.png`}
            class="w-6 aspect-square"
          />
          {item.price}
        </div>

        <img
          class={`m-0 max-w-[300px] w-[100%] aspect-square transition-all duration-500 ${
            hovering ? "scale-110" : ""
          } block`}
          src={`${ZUNGLE_ITEM_SHOP_IMAGE_URL}/${item.id}.png`}
        />
      </div>
      <div class="pb-5 px-2 md:px-4 flex flex-col text-white">
        <div class="overflow-hidden ">
          <span class="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold">
            {item.name}
          </span>
        </div>
        <div class="flex flex-row justify-between items-end pb-5 ">
          <div>
            <button
              class="hover:border-mnkz-red border-white border-2 px-4 py-2 rounded-xl text-lg hover:text-mnkz-red hover:cursor-pointer right-0 disabled:border-gray-700 disabled:text-gray-700 disabled:cursor-default disabled:hover:text-gray-400"
              onClick={() => decrease()}
            >
              -
            </button>
            <span class="text-lg m-1">{amount}</span>
            <button
              class="hover:border-mnkz-wobo border-white border-2 px-4 py-2 rounded-xl text-lg hover:text-mnkz-wobo hover:cursor-pointer right-0 disabled:border-gray-700 disabled:text-gray-700 disabled:cursor-default disabled:hover:text-gray-400"
              onClick={() => increase()}
            >
              +
            </button>
          </div>

          <div class="flex flex-col justify-center items-center">
            <button
              class="w-full my-1 hover:border-mnkz-wobo border-white border-2 px-4 py-2 rounded-xl text-lg hover:text-mnkz-wobo hover:cursor-pointer right-0 disabled:border-gray-700 disabled:text-gray-700 disabled:cursor-default "
              onClick={() => buyNow()}
              disabled={isMining}
            >
              Buy {amount}
            </button>
            <button
              class="w-full hover:border-mnkz-tan border-white border-2 px-4 py-2 rounded-xl text-lg hover:text-mnkz-tan hover:cursor-pointer right-0 disabled:border-gray-700 disabled:text-gray-700 disabled:cursor-default disabled:hover:text-gray-400"
              onClick={() => addItem(item, amount)}
            >
              Add
            </button>
          </div>

          {/* <button
            class=" hover:border-mnkz-tan border-white border-2 px-4 py-2 rounded-xl text-lg hover:text-mnkz-tan hover:cursor-pointer right-0 disabled:border-gray-700 disabled:text-gray-700 disabled:cursor-default disabled:hover:text-gray-400"
            onClick={() => addItem(item, amount)}
          >
            Add
          </button> */}
        </div>
      </div>
    </div>
  );
}
