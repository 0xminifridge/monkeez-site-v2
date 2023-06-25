import { ZOOG_STATS } from "../../utils/collection-data";
export default function ZoogTypes() {
  const zoogTypes = [
    {
      type: "Lump",
      color: "zoog-lump",
      description: "Born from the earth",
    },
    {
      type: "Puff",
      color: "zoog-puff",
      description: "Born from the air",
    },
    {
      type: "Drip",
      color: "zoog-drip",
      description: "Born from the sea",
    },
    {
      type: "Glow",
      color: "zoog-glow",
      description: "Born from the fire",
    },
  ];

  return (
    <>
      <div class="flex flex-col justify-center">
        <span
          id="Types"
          class="text-[4em] md:text-[100px] text-white text-shadow-custom m-auto font-bold"
        >
          ZOOG TYPES
        </span>
        <div class="flex flex-wrap justify-center">
          {zoogTypes.map((item, index) => {
            return (
              <div
                key={index}
                class="w-[260px] h-[450px] p-[15px] m-[0.5rem] border-[5px] border-solid border-black rounded-[25px] text-center overflow-hidden bg-[whitesmoke]"
              >
                <div
                  class={`w-fit overflow-hidden inline-block bg-${item.color} w-full rounded-[20px]`}
                >
                  <img
                    src={`./images/zoogz/types/${item.type.toLowerCase()}.png`}
                    class={`m-0 w-[260px] rounded-[20px]`}
                  />
                </div>
                <div
                  class={`w-full rounded-[16px] bg-${item.color} py-[4px] my-1`}
                >
                  <span class="text-[2rem] font-bold">{item.type}</span>
                </div>
                <div class="my-4 grid grid-cols-2">
                  {ZOOG_STATS.map((stat, index) => {
                    return (
                      <div
                        key={index}
                        class="flex flex-row items-center justify-start"
                      >
                        <img
                          src={`${process.env.PUBLIC_URL}/images/zoogz/stats/${stat}.png`}
                          class="w-10"
                        />
                        <span>{stat}</span>
                      </div>
                    );
                  })}
                  <div class="flex flex-row items-center justify-start">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/zoogz/stats/energy.png`}
                      class="w-10"
                    />
                    <span>Energy</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
