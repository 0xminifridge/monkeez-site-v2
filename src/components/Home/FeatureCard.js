import { useState } from "react";

export default function FeatureCard({ item }) {
  const [hovering, setHovering] = useState(false);
  return (
    <>
      <div
        class={`border-black border-4 border-solid rounded-xl p-2 md:p-4 m-2 ${item?.background} box-shadow-custom relative overflow-hidden hover:cursor-pointer`}
        onMouseOver={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div
          class={`flex flex-col justify-center items-center rounded-xl p-2 border-white border-2 border-solid`}
        >
          <div class="rounded overflow-hidden">
            <img
              src={item?.image}
              alt={item?.name}
              class="aspect-square w-[300px]"
            />
          </div>
          <div class="flex flex-col justify-center items-center mt-2">
            <span
              class="font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
              to={item?.link}
              target="_blank"
            >
              {item?.name}
            </span>
          </div>
        </div>
        <div
          class={`${
            hovering ? "" : "hidden"
          } transition duration-500 absolute bottom-0 left-0 w-full h-full flex justify-center items-center text-center bg-gray-300/80 z-5 p-5`}
          style={{ animation: "slide-up 0.3s ease-in-out forwards" }}
        >
          <div class="flex flex-col m-auto w-full h-full">
            <span
              class={`text-white text-3xl border-4 border-solid border-black ${item?.background} rounded-full box-shadow-custom mx-auto w-[60%]`}
            >
              {item?.name}
            </span>
            <span class="py-4">{item?.description}</span>
          </div>
        </div>
      </div>
    </>
  );
}
