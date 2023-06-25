import { MONKEEZ_MARKET_DATA, MARKET_LIST } from "../../utils/markets";
import { Tooltip } from "flowbite-react";

export default function MarketListContainer({ marketData, id }) {
  return (
    <div class="flex flex-row justify-start">
      {MARKET_LIST.map((item, index) => {
        return (
          <>
            <Tooltip content={`Buy on ${item}`}>
              <a
                key={index}
                class="hover:cursor-pointer hover:opacity-70 overflow-hidden rounded-full flex items-center justify-center m-2 aspect-square border-0 border-black border-solid"
                href={`${marketData[item]?.asset}/${id}`}
                target="_blank"
              >
                <img
                  src={`${
                    process.env.PUBLIC_URL
                  }/images/markets/${item?.toLowerCase()}.png`}
                  width="50"
                  alt={item}
                />
              </a>
            </Tooltip>
          </>
        );
      })}
    </div>
  );
}
