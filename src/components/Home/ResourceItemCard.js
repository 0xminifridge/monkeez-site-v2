import { Tooltip } from "flowbite-react";
export default function ResourceItemCard({ item }) {
  return (
    <>
      <div class="flex flex-col justify-center items-center">
        <Tooltip content={item}>
          <div class="my-2 flex flex-col justify-center overflow-hidden bg-mnkz-blue rounded-full max-w-[75px] md:max-w-[100px] w-full border-4 border-black border-solid">
            <img
              src={`${process.env.PUBLIC_URL}/images/items/${item}.png`}
              alt={item?.name}
              class="aspect-square max-w-[75px] md:max-w-[100px] w-full transition-all duration-500 hover:scale-125"
            />
          </div>
        </Tooltip>
      </div>
    </>
  );
}
