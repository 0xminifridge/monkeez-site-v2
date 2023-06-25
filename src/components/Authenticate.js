import RainbowKitCustomConnectButton from "./RainbowKitCustomConnectButton";

export default function Authenticate() {
  return (
    <>
      <div class="p-8 sm:p-48 text-center h-[90vh]">
        <div class="w-80 inline-flex justify-center">
          <div class="border-4 border-solid border-black rounded-xl bg-white p-4 flex justify-center flex-col">
            <div class="overflow-hidden rounded-full w-40 h-40 border-solid border-black border-2 m-auto bg-mnkz-blue">
              <img
                src="./images/sad-monkee.png"
                class="max-w-sm sm:max-w-md my-4 w-40"
              />
            </div>
            <div class="mt-10">
              <h3>Not Connected</h3>
              <div class="flex">
                <RainbowKitCustomConnectButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
