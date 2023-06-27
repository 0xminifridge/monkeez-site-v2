import { Link } from "react-router-dom";
export default function Landing() {
  return (
    <>
      <div class="w-[100vw] h-[100vh] bg-[#72D1F2]">
        <div class="flex justify-center items-center w-full h-full relative">
          <img src={`${process.env.PUBLIC_URL}/images/zungle-map.png`} />
          <div class="absolute z-10 left-0 right-0 mx-auto flex justify-center">
            <a
              href="/home"
              class="px-4 py-2 rounded-xl box-shadow-custom border-2 md:border-4 border-solid border-black bg-mnkz-tan hover:bg-black hover:text-white text-lg sm:text-2xl md:text-4xl"
            >
              <span class="animate-pulse hover:animate-none">
                Enter the Zungle
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
