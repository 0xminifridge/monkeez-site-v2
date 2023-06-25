import { useState } from "react";
import { ZUNGLE_ITEM_SHOP_IMAGE_URL } from "../../../utils/metadata";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../reducers/itemShopReducer";

export default function ShopItemCard({ item }) {
  const [hovering, setHovering] = useState(false);
  const [amount, setAmount] = useState(1);

  const dispatch = useDispatch();

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

  return (
    <div
      class={`bg-black border-4 relative rounded-2xl border-solid border-black hover:border-mnkz-tan hover:cursor-pointer w-full h-full max-h-[400px]`}
      //   onClick={() => navigate(`/monkeez/${item.id}`)}
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div class="inline-block overflow-hidden m-0 relative rounded-t-xl">
        <h3 class="absolute top-2 left-2 z-10 rounded-lg bg-gray-300/50 px-2 py-1 hidden sm:block">
          XP: {item.xp}
        </h3>

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
        <div class="flex flex-row justify-between items-center pb-5 ">
          <div>
            <button
              class="hover:border-mnkz-tan border-white border-2 px-4 py-2 rounded-xl text-lg hover:text-mnkz-tan hover:cursor-pointer right-0 disabled:bg-gray-300 disabled:text-light disabled:cursor-default disabled:hover:text-gray-400"
              onClick={() => decrease()}
            >
              -
            </button>
            <span class="text-lg m-1">{amount}</span>
            <button
              class="hover:border-mnkz-tan border-white border-2 px-4 py-2 rounded-xl text-lg hover:text-mnkz-tan hover:cursor-pointer right-0 disabled:bg-gray-300 disabled:text-light disabled:cursor-default disabled:hover:text-gray-400"
              onClick={() => increase()}
            >
              +
            </button>
          </div>

          <button
            class=" hover:border-mnkz-tan border-white border-2 px-4 py-2 rounded-xl text-lg hover:text-mnkz-tan hover:cursor-pointer right-0 disabled:bg-gray-300 disabled:text-light disabled:cursor-default disabled:hover:text-gray-400"
            onClick={() => addItem(item, amount)}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
