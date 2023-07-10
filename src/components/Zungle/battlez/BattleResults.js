import BattleCard from "./BattleCard";
import { TwitterShareButton } from "react-share";
import { parseEther, parseUnits } from "viem";

export default function BattleResults({
  challenger,
  opponent,
  resultConfig,
  handleClose,
}) {
  const textColorForResult = {
    win: "text-mnkz-wobo",
    lose: "text-mnkz-red",
    draw: "text-mnkz-tan",
  };

  const opponentCase = {
    win: "lose",
    lose: "win",
    draw: "draw",
  };

  const tweetPrefix = {
    win: "Just won a Zoog battle",
    lose: "Just lost a Zoog battle",
    draw: "Just tied a Zoog battle",
  };

  const getTweetText = (result, tokens) => {
    if (result === "win") {
      return `Just won a Zoog battle for ${tokens} $MNKZ!\n\n`;
    } else if (result === "lose") {
      return `Just lost a Zoog battle for ${tokens} $MNKZ!\n\n`;
    } else if (result === "draw") {
      return `Just tied a Zoog battle for ${tokens} $MNKZ!\n\n`;
    }
  };

  if (!resultConfig) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-opacity-[0.95] bg-black ${
        true ? "" : "hidden"
      }`}
    >
      <div
        className=" mx-4 w-[350px] sm:w-[450px] md:w-[550px] lg:w-[625px] shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div class="flex flex-col justify-center items-center">
          {resultConfig?.case === "win" && (
            <span class="text-white font-bold text-4xl">You won!</span>
          )}
          {resultConfig?.case === "lose" && (
            <span class="text-white font-bold text-4xl">You lost!</span>
          )}
          {resultConfig?.case === "draw" && (
            <span class="text-white font-bold text-4xl">It's a tie!</span>
          )}
          <div class="flex flex-row justify-between items-center w-full">
            {/* card one */}
            <div class="flex flex-col justify-center items-center">
              <span class="text-white text-xl font-bold">You</span>
              <BattleCard zoog={challenger} />
            </div>

            <div class="flex flex-col justify-center items-center text-white">
              <img
                src={`${process.env.PUBLIC_URL}/images/zoogz/stats/sword-n-shield.png`}
                class="w-full max-w-[30px] md:max-w-[50px] aspect-square"
              />
            </div>

            {/* card two */}
            <div class="flex flex-col justify-center items-center">
              <span class="text-white text-xl font-bold">Opponent</span>
              <BattleCard zoog={opponent} />
            </div>
          </div>
        </div>

        <div class="flex flex-row w-full justify-between items-center border-gray-800 border-solid border-2 rounded-xl text-white px-4 py-2 my-2">
          {/* you */}
          <BattleDetails
            config={resultConfig?.challenger}
            player={"You"}
            type={challenger?.type}
            stat={resultConfig?.stat}
            textColor={textColorForResult[resultConfig?.case]}
            resultCase={resultConfig?.case}
          />
          <div class="flex flex-col justify-center items-center text-gray-500">
            <span class="font-bold text-xl underline invisible">Title</span>
            <div class="flex flex-row justify-center items-center  px-2 py-1 rounded-xl my-0.5 w-[90px] h-[40px] md:w-[110px] md:h-[70px]">
              <span>Dice</span>
            </div>
            <div class="flex flex-row justify-center items-center  px-2 py-1 rounded-xl my-0.5 w-[90px] h-[40px] md:w-[110px] md:h-[70px]">
              <span>Stat</span>
            </div>
            <div class="flex flex-row justify-center items-center  px-2 py-1 rounded-xl my-0.5 w-[90px] h-[40px] md:w-[110px] md:h-[70px]">
              <span>Type</span>
            </div>
            <hr class="bg-gray-400" />
            <div class="flex flex-row justify-center items-center  px-2 py-1 rounded-xl my-0.5 w-[90px] h-[40px] md:w-[110px] md:h-[70px]">
              <span>Total</span>
            </div>
            <div class="flex flex-row justify-center items-center  px-2 py-1 rounded-xl my-0.5 w-[90px] h-[40px] md:w-[110px] md:h-[70px]">
              <span>MNKZ</span>
            </div>
          </div>
          {/* them */}
          <BattleDetails
            config={resultConfig?.opponent}
            player={"Them"}
            type={opponent?.type}
            stat={resultConfig?.stat}
            textColor={textColorForResult[opponentCase[resultConfig?.case]]}
            resultCase={opponentCase[resultConfig?.case]}
          />
        </div>
        <div class="flex flex-row justify-center items-center">
          <button
            class="bg-mnkz-wobo rounded-xl px-4 py-2 hover:bg-mnkz-tan m-1 disabled:bg-gray-300 disabled:text-gray-400"
            onClick={handleClose}
          >
            Return Home
          </button>
          <TwitterShareButton
            url={`https://www.monkeez.io/zoogz/${challenger?.id}`}
            title={getTweetText(
              resultConfig?.case,
              resultConfig?.challenger?.tokens
            )}
            hashtags={["Monkeez", "Zoogz"]}
          >
            <button class="bg-mnkz-blue rounded-xl px-4 py-2 hover:bg-mnkz-tan m-1">
              Tweet Results
            </button>
          </TwitterShareButton>
        </div>
      </div>
    </div>
  );
}

function BattleDetails({ config, player, type, stat, textColor, resultCase }) {
  return (
    <div class="flex flex-col justify-center items-center">
      <span class="font-bold text-xl underline">{player}</span>
      <div class="flex flex-row justify-between items-center bg-gray-800 px-2 py-1 rounded-xl my-0.5 w-[90px] h-[40px] md:w-[110px] md:h-[70px]">
        <img
          src={`${process.env.PUBLIC_URL}/images/icons/dice.png`}
          class="w-full max-w-[30px] md:max-w-[50px] aspect-square"
        />
        <span>+{config?.diceRoll}</span>
      </div>
      <div class="flex flex-row justify-between items-center bg-gray-800 px-2 py-1 rounded-xl my-0.5 w-[90px] h-[40px] md:w-[110px] md:h-[70px]">
        <img
          src={`${
            process.env.PUBLIC_URL
          }/images/zoogz/stats/${stat?.toLowerCase()}.png`}
          class="w-full max-w-[30px] md:max-w-[50px] aspect-square"
        />
        <span>+{config?.statAdvantage}</span>
      </div>
      <div class="flex flex-row justify-between items-center bg-gray-800 px-2 py-1 rounded-xl my-0.5 w-[90px] h-[40px] md:w-[110px] md:h-[70px]">
        <img
          src={`${
            process.env.PUBLIC_URL
          }/images/zoogz/types/${type?.toLowerCase()}.png`}
          class="w-full max-w-[30px] md:max-w-[50px] aspect-square"
        />
        <span>+{config?.typeAdvantage}</span>
      </div>
      <hr class="bg-gray-400" />
      <div class="flex flex-row justify-center items-center bg-gray-800 px-2 py-1 rounded-xl my-0.5 w-[90px] h-[40px] md:w-[110px] md:h-[70px]">
        <span class={`${textColor}`}>
          Total:{" "}
          {config?.diceRoll + config?.statAdvantage + config?.typeAdvantage}
        </span>
      </div>
      <div class="flex flex-row justify-between items-center bg-gray-800 px-2 py-1 rounded-xl my-0.5 w-[90px] h-[40px] md:w-[110px] md:h-[70px]">
        <img
          src={`${process.env.PUBLIC_URL}/images/mnkz-token.png`}
          class="w-full max-w-[30px] md:max-w-[50px] aspect-square"
        />
        {resultCase === "win" && (
          <span class="text-mnkz-wobo">+{config?.tokens}</span>
        )}
        {resultCase === "lose" && (
          <span class="text-mnkz-red">-{config?.tokens}</span>
        )}
        {resultCase === "draw" && (
          <span class="text-mnkz-tan">{config?.tokens}</span>
        )}
      </div>
    </div>
  );
}
