import { useState } from "react";
import { ZUNGLE_ITEM_SHOP_IMAGE_URL } from "../../../utils/metadata";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../reducers/itemShopReducer";
import { usePurchaseItems } from "../../../hooks/useItemShop";
import { FaShoppingCart } from "react-icons/fa";

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

  const handleSelectChange = (value) => {
    setAmount(value);
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

  const options = Array.from({ length: 100 }, (_, i) => ({
    value: i + 1,
    label: (i + 1).toString(),
  }));

  return (
    <div
      class={`bg-black border-4 relative rounded-2xl border-solid border-black hover:border-mnkz-tan hover:cursor-pointer w-full `}
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
        <div class="flex flex-col justify-center items-center ">
          <div class="flex justify-center items-center w-full">
            <select
              id="quantity"
              // value="Select Quantity"
              class="border-white hover:border-mnkz-tan hover:text-mnkz-tan hover:cursor-pointer border-2 border-solid bg-transparent rounded-xl text-sm md:text-lg w-full p-2.5 focus:ring-mnkz-tan focus:border-mnkz-tan"
              onChange={(e) => handleSelectChange(e.target.value)}
            >
              <option disabled hidden selected>
                Select Quantity
              </option>
              {options?.map((item, index) => {
                return (
                  <option key={index} value={item?.label}>
                    {item?.value}
                  </option>
                );
              })}
            </select>

            {/* <button
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
            </button> */}
          </div>

          <div class="flex flex-col md:flex-row justify-center items-center w-full h-full">
            <button
              class="w-full my-1 md:mr-1 hover:border-mnkz-wobo border-white border-2 px-4 py-2 rounded-xl text-sm md:text-lg hover:text-mnkz-wobo hover:cursor-pointer right-0 disabled:border-gray-700 disabled:text-gray-700 disabled:cursor-default "
              onClick={() => buyNow()}
              disabled={isMining}
            >
              Buy {amount}
            </button>
            <button
              class="w-full my-1 md:ml-1 hover:border-mnkz-tan border-white border-2 px-4 py-2 rounded-xl text-sm md:text-lg hover:text-mnkz-tan hover:cursor-pointer right-0 disabled:border-gray-700 disabled:text-gray-700 disabled:cursor-default disabled:hover:text-gray-400"
              onClick={() => addItem(item, amount)}
            >
              <div class="flex flex-row justify-center items-center">
                <span>Add</span>
                <FaShoppingCart class="text-lg w-10" />
              </div>
            </button>
          </div>
          {/* <div class="flex flex-row justify-center items-center w-full">
            <div class="flex flex-col justify-between items-start pb-5 ">
              <div class="flex flex-row justify-between items-center">
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
              <button
                class="w-full my-1 hover:border-mnkz-wobo border-white border-2 px-4 py-2 rounded-xl text-lg hover:text-mnkz-wobo hover:cursor-pointer right-0 disabled:border-gray-700 disabled:text-gray-700 disabled:cursor-default "
                onClick={() => buyNow()}
                disabled={isMining}
              >
                Buy {amount}
              </button>
            </div>

            <button
              class="w-full hover:border-mnkz-tan border-white border-2 px-4 py-2 rounded-xl text-lg hover:text-mnkz-tan hover:cursor-pointer right-0 disabled:border-gray-700 disabled:text-gray-700 disabled:cursor-default disabled:hover:text-gray-400"
              onClick={() => addItem(item, amount)}
            >
              Add
            </button>
          </div> */}

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
