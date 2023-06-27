import { Link } from "react-router-dom";
export default function CollectionInfoCard({ item }) {
  return (
    <>
      <div class="bg-white border-black border-4 border-solid rounded-xl p-2 md:p-4 m-2 box-shadow-custom">
        <div class="flex flex-col justify-center items-center">
          <div class="rounded-xl overflow-hidden">
            <img
              src={item?.image}
              alt={item?.name}
              class="aspect-square w-full max-w-[300px] md:max-w-[400px]"
            />
          </div>
          <div class="flex flex-col justify-center items-center mt-2">
            <Link
              class="font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl hover:text-mnkz-tan"
              to={item?.link}
              target="_blank"
            >
              {item?.name}
            </Link>
            <span class="text-base sm:text-lg md:text-xl lg:text-2xl">
              {item?.description}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
