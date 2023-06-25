import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartIcon from "./icons/CartIcon";
import { FaShoppingCart } from "react-icons/fa";
import XWithCircle from "./icons/XWithCircle";
import { ZUNGLE_ITEM_SHOP_IMAGE_URL } from "../utils/metadata";
import { removeFromCart } from "../reducers/itemShopReducer";
import { usePurchaseItems } from "../hooks/useItemShop";

export default function ShopCart({}) {
  const [open, setOpen] = useState(false);

  const cartItems = useSelector((state) => state.itemShop.cartItems);
  const dispatch = useDispatch();

  const { writeTx: buyItemsFromShop, isMining } = usePurchaseItems();

  const purchaseItems = async () => {
    const typeIds = cartItems.map(function (item) {
      return item.id;
    });
    const amounts = cartItems.map(function (item) {
      return item.amount;
    });

    await buyItemsFromShop(typeIds, amounts);
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      setOpen(false);
    }
  }, [cartItems]);

  if (cartItems?.length === 0) {
    return <></>;
  }
  return (
    <>
      <div class="z-20 bottom-4 right-6 w-auto fixed ">
        {open && (
          <div class="bg-white w-80 h-96 z-[90] rounded-xl rounded-br-[40px] border-black border-solid border-4 bottom-6 right-8">
            <div class="overflow-scroll h-[307px]">
              {cartItems.map((item, index) => {
                const itemTotal = item.price * item.amount;
                return (
                  <div
                    class="flex flex-row items-center rounded m-1 mx-2"
                    key={index}
                  >
                    <div
                      class="hover:cursor-pointer"
                      onClick={() => dispatch(removeFromCart(index))}
                    >
                      <XWithCircle color={"#d6303c"} />
                    </div>

                    <div class="flex flex-row ml-2">
                      <img
                        src={`${ZUNGLE_ITEM_SHOP_IMAGE_URL}/${item.id}.png`}
                        class="w-10 aspect-square rounded"
                      />
                      <div class="flex flex-col mx-1">
                        <h3>{item.name}</h3>

                        <div class="flex flex-row items-center">
                          <img
                            class="w-4"
                            src={`${process.env.PUBLIC_URL}/images/mnkz-token.png`}
                          />
                          <h6>{item.price}</h6>
                        </div>
                      </div>
                    </div>
                    <h4>x {item.amount}</h4>

                    <h4 class="right-0 m-auto justify-end text-mnkz-red">
                      ${itemTotal}
                    </h4>
                  </div>
                );
              })}
            </div>
            <hr class="h-[2px] bg-black rounded"></hr>

            <div class="flex flex-row items-center bottom-0 pt-2 w-[75%]">
              <button
                class="bottom-6 bg-mnkz-wobo hover:bg-mnkz-tan w-70 border-2 ml-2 px-4 py-2 rounded-xl text-lg hover:text-white hover:cursor-pointer right-0 disabled:bg-gray-300 disabled:text-light disabled:cursor-default disabled:hover:text-gray-400"
                onClick={() => purchaseItems()}
                disabled={isMining || !cartItems?.length}
              >
                Buy
              </button>
              <div class="mx-2">
                <h3 class="m-auto">
                  Total: <span class="text-mnkz-red">${100}</span>
                </h3>
              </div>
            </div>
          </div>
        )}
        <div
          class="bg-white hover:bg-mnkz-tan hover:cursor-pointer border-black border-solid border-4 rounded-full bottom-4 right-6 w-auto fixed"
          onClick={() => setOpen(!open)}
        >
          <div class="flex flex-row justify-left px-2 py-4 relative">
            {!open && (
              <div class="absolute top-[-.5rem] right-[-.5rem] z-[105] rounded-full border-solid border-4 border-black bg-mnkz-red text-white px-2">
                <span>{cartItems.length}</span>
              </div>
            )}
            <div class="flex">
              <FaShoppingCart class="text-2xl w-10 text-black m-2" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
