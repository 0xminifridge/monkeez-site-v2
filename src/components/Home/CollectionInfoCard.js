import { Link } from "react-router-dom";
export default function CollectionInfoCard({ item }) {
  return (
    <>
      <Link to={item?.link} target="_blank">
        <div class="bg-white border-black border-4 border-solid rounded-xl p-2 md:p-4 m-2 box-shadow-custom-hoverable hover:-rotate-2 duration-200 relative">
          <div class="flex flex-col justify-center items-center">
            <div class="rounded-xl overflow-hidden">
              <img
                src={item?.image}
                alt={item?.name}
                class="aspect-square w-full max-w-[300px] md:max-w-[400px]"
              />
            </div>
            <div class="flex flex-col justify-center items-center mt-2">
              <div class="font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl ">
                {item?.name}
              </div>
              <span class="text-base sm:text-lg md:text-xl lg:text-2xl">
                {item?.description}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
