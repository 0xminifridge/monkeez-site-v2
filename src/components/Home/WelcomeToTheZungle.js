export default function WelcomeToTheZungle() {
  return (
    <>
      <div class="h-auto md:min-h-[100vh] mt-[10vh] flex flex-col md:flex-row items-center container m-auto ">
        <div class="float-left flex md:hidden justify-center md:w-[50%]">
          <img
            src={`${process.env.PUBLIC_URL}/images/home/zungle-map.png`}
            class="flex md:block pr-0 h-max-[100vh] w-min-auto md:w-min-[400px] w-[100%] md:w-[85%] md:pb-[5vh]"
          />
        </div>
        <div class="md:w-[50%] float-right">
          <div class="bg-mnkz-api mx-[10px] md:mr-[0px] md:ml-[30px] rounded-[7px] border-solid border-black border-4 p-[10px] box-shadow-custom">
            <span class="text-[3em] pb-[0.3rem] pr-[0.3rem] text-white text-shadow-custom font-bold">
              Welcome to the Zungle!
            </span>
            <p class="text-[1.5rem]">
              The Zungle is a virtual world built on top of the Avalanche
              blockchain where inhabitants can trade, fight, and explore the
              realm together. Own, collect, and trade one-of-a-kind digital
              assets while discovering all that the world has to offer through
              the blockchain. Current inhabitants include{" "}
              <a class="text-white hover:text-mnkz-tan" href="#Monkeez">
                Monkeez
              </a>{" "}
              and{" "}
              <a class="text-white hover:text-mnkz-tan" href="#Zoogz">
                Zoogz
              </a>
            </p>
          </div>
        </div>
        <div class="md:w-[50%] float-left hidden md:flex justify-center">
          <img
            src={`${process.env.PUBLIC_URL}/images/home/zungle-map.png`}
            class="flex md:block pr-0 h-max-[100vh] w-min-auto md:w-min-[400px] w-[100%] md:w-[85%] md:pb-[5vh]"
          />
        </div>
      </div>
    </>
  );
}
