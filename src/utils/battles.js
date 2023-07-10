import {
  BATTLE_MOVES,
  BATTLE_DAMAGE,
  BATTLE_TYPE_ADVANTAGES,
} from "./battle-data";

export function formatBattleMove(type, moveNumber, isPlayer) {
  const randNum = Math.random();
  const randDamage = Math.floor(randNum * BATTLE_DAMAGE?.player?.length);

  const verbs = ["unleashed", "used", "performed", "tried", "fired"];

  const randVerb = Math.floor((randNum / 2) * verbs?.length);
  console.log(randVerb);

  if (isPlayer) {
    return `You ${verbs[randVerb]} ${
      BATTLE_MOVES[type?.toLowerCase()][moveNumber]
    } on opponent... ${BATTLE_DAMAGE?.player[randDamage]}`;
  } else {
    return `Opponent ${verbs[randVerb]} ${
      BATTLE_MOVES[type?.toLowerCase()][moveNumber]
    }... ${BATTLE_DAMAGE?.opponent[randDamage]}`;
  }
}

export function getTypeAdvantage(challenger, opponent) {
  if (
    BATTLE_TYPE_ADVANTAGES[challenger?.type?.toLowerCase()] ===
    opponent?.type?.toLowerCase()
  ) {
    return 1;
  } else {
    return 0;
  }
}
