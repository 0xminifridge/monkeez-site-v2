export default function TokenInfo() {
  const tokenList = [
    {
      name: "MNKZ",
      description: (
        <span>
          An ecosystem token powering anything and everything in the Zungle
          gained by staking Monkeez or battling Zoogz. MNKZ is used for{" "}
          <strong>buying</strong> items, <strong>unlocking</strong> land tiles,{" "}
          <strong>building</strong> structures, and much much more. As the
          Zungle grows, so does the use cases for MNKZ.
        </span>
      ),
    },
    {
      name: "GEMZ",
      description: (
        <span>
          A secondary token launched with the land expansion of the Zungle and
          obtained through Zoog Battlez. GEMZ is used for avoiding cooldowns in
          the land sector of the Zungle, skipping wait times for tile unlocks
          and upgrades.
        </span>
      ),
    },
  ];
  return (
    <>
      <div class="container m-auto flex flex-col justify-center md:h-[80vh] ">
        <div class="flex justify-center">
          <span class="my-2 text-white text-4xl md:text-5xl font-bold tracking-wider bg-mnkz-wobo rounded-full border-4 border-solid border-black py-2 px-4 box-shadow-custom">
            Tokens
          </span>
        </div>
        <div class="bg-white border-solid border-4 border-black rounded-xl p-2 md:p-4 m-2 box-shadow-custom">
          <div class="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-4">
            {tokenList?.map((item, index) => {
              return (
                <div class="flex flex-col justify-center items-center bg-gray-100 rounded-xl p-1 ">
                  <div class="flex flex-row justify-center items-center ">
                    <img
                      src={`${
                        process.env.PUBLIC_URL
                      }/images/${item?.name?.toLowerCase()}-token.png`}
                      class="aspect-square w-40"
                    />
                    <span class="text-black text-4xl px-4 py-2 rounded-full bg-mnkz-blue border-4 border-solid border-black box-shadow-custom">
                      ${item?.name}
                    </span>
                  </div>
                  <div class="p-2 text-center text-xl">{item?.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
