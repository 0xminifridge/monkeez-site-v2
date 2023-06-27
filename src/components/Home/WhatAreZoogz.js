export default function WhatAreZoogz() {
  return (
    <>
      <div
        id="Zoogz"
        class="flex flex-col md:flex-row h-auto min-h-[100vh] items-center mt-[10vh] container m-auto "
      >
        <div class="flex md:hidden float-left items-start ">
          <img
            src={`${process.env.PUBLIC_URL}/images/zoogz/zoogz-hero.png`}
            class="flex md:block pr-0 h-max-[100vh] w-min-auto md:w-min-[400px] w-[100%] md:w-[85%] md:pb-[5vh]"
          />
        </div>
        <div class="md:w-[50%] float-right md:float-left">
          <div class="bg-mnkz-xeba mx-[10px] md:ml-[30px] md:mr-[0px] rounded-[7px] border-solid border-black border-4 p-[10px] box-shadow-custom">
            <span class="text-[3em] pb-[0.3rem] pr-[0.3rem] text-white text-shadow-custom font-bold">
              What are Zoogz?
            </span>
            <p class="text-[1.5rem]">
              Zungle companion creatures! Opened from a shipment of{" "}
              <a class="text-white hover:text-mnkz-tan" href="/cratez">
                Cratez
              </a>
              , Zoogz are upgradeable NFTs that come in 4{" "}
              <a class="text-white hover:text-mnkz-tan" href="#Types">
                types
              </a>{" "}
              and with 4 stats. Stats are initialized using Chainlink VRF and
              upgraded with items purchased in the{" "}
              <a
                class="text-white hover:text-mnkz-tan"
                href="/zungle?selected=Shop"
              >
                Zungle Item Shop
              </a>
            </p>
          </div>
        </div>
        <div class="md:w-[50%] hidden md:flex float-right justify-center">
          <img
            src={`${process.env.PUBLIC_URL}/images/zoogz/zoogz-hero.png`}
            class="flex md:block pr-0 h-max-[100vh] w-min-auto md:w-min-[400px] w-[100%] md:w-[85%] md:pb-[5vh]"
          />
        </div>
      </div>
    </>
  );
}
