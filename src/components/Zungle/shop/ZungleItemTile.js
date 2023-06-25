import { ZOOG_STATS } from "../../../utils/collection-data";
import { ZUNGLE_ITEM_SHOP_IMAGE_URL } from "../../../utils/metadata";
import { useState } from "react";

export default function ZungleItemTile({
  item,
  addItem,
  removeItem,
  selectable,
  index,
}) {
  const [selected, setSelected] = useState(false);

  const clickItem = async (item) => {
    if (selected) {
      await removeItem(index);
      setSelected(false);
    } else {
      // item.index = index;
      await addItem({ id: item.id, amount: 1, index: index, xp: item?.xp });
      if (selectable) {
        setSelected(true);
      }
    }
  };

  return (
    <div
      class={`w-20 md:w-24 relative ${
        selected ? "border-mnkz-wobo" : "border-black"
      } hover:border-mnkz-tan hover:cursor-pointer border-solid border-4 rounded-xl overflow-hidden`}
      onClick={() => clickItem(item)}
    >
      <div class="relative flex justify-center">
        <div class="absolute bottom-1 flex flex-row justify-center">
          {ZOOG_STATS.map((stat, index) => {
            if (item[stat?.toLowerCase()]) {
              return (
                <img
                  key={index}
                  class="w-3 md:w-4"
                  src={`${
                    process.env.PUBLIC_URL
                  }/images/zoogz/stats/${stat?.toLowerCase()}.png`}
                />
              );
            } else {
              return <></>;
            }
          })}
        </div>
        <span class="text-xs md:text-sm absolute top-0 ">XP:{item.xp}</span>

        <img
          class="w-20 md:w-24 flex"
          src={`${ZUNGLE_ITEM_SHOP_IMAGE_URL}/${item?.id}.png`}
        />
      </div>
    </div>
  );
}
