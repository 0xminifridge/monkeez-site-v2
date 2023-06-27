export function TribeCard({ tribe }) {
  return (
    <div class="w-full max-w-[300px] p-[15px] m-[0.5rem] border-solid border-black border-[5px] bg-white rounded-3xl text-center overflow-hidden box-shadow-custom">
      <div class="inline-block w-fit overflow-hidden m-0">
        <img src={tribe.img} class="m-0 w-[260px] rounded-[20px]" />
      </div>
      <div
        style={{ background: tribe.color }}
        class="flex flex-col w-[260px] rounded-2xl px-[4px]"
      >
        <span class="text-black text-[2rem] px-[2px] py-[4px] font-bold">
          {tribe.rarity}
        </span>
      </div>
      <div class="flex flex-col justify-center">
        <span class="text-black text-[2rem] px-[2px] py-[4px] font-semibold">
          {tribe.name}
        </span>
        <span class="text-xl">SUPPLY: {tribe.amount}</span>
        <div class="flex flex-row items-center justify-center text-xl">
          <img
            class="w-8"
            src={`${process.env.PUBLIC_URL}/images/mnkz-token.png`}
          />
          <span>{tribe.emission} MNKZ daily</span>
        </div>
      </div>
    </div>
  );
}

export default function MonkeezTribes() {
  const tribeData = [
    {
      img: "./images/tribe-api.png",
      name: "Api",
      amount: "40%",
      rarity: "Common",
      color: "#A776BE",
      emission: "5",
    },
    {
      img: "./images/tribe-wobo.png",
      name: "Wobo",
      amount: "30%",
      rarity: "Semi Rare",
      color: "#77E0A7",
      emission: "10",
    },
    {
      img: "./images/tribe-xeba.png",
      name: "Xeba",
      amount: "20%",
      rarity: "Rare",
      color: "#F794C1",
      emission: "20",
    },
    {
      img: "./images/tribe-pelu.png",
      name: "Pelu",
      amount: "10%",
      rarity: "Scarce",
      color: "#F7B55E",
      emission: "40",
    },
  ];

  return (
    <div class="flex flex-col justify-center container m-auto">
      <span
        id="Tribes"
        class="text-6xl md:text-[100px] text-white text-shadow-custom m-auto font-bold"
      >
        TRIBES
      </span>
      <div class="flex flex-wrap justify-center">
        {tribeData.map((tribe, index) => (
          <TribeCard key={index} tribe={tribe} />
        ))}
      </div>
    </div>
  );
}
