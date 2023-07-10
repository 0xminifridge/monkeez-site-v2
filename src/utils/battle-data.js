export const BATTLE_MOVES = {
  drip: ["Aqua Surge", "Bubble Torrent", "Tidal Surge", "Aqua Shield"],
  glow: ["Inferno Blast", "Flame Cyclone", "Blazing Inferno", "Ember Burst"],
  lump: ["Terra Crush", "Earthen Quake", "Quakesand", "Mudslide"],
  puff: ["Zephyr Strike", "Tempest Twirl", "Cyclone Smash", "Gale Burst"],
};

export const BATTLE_DAMAGE = {
  player: [
    "Critical hit!",
    "Nice one!",
    "Could've been better...",
    "Not too shabby",
    "Get em!",
    "All that practice pays off",
  ],
  opponent: [
    "Critical hit!",
    "You take damage",
    "You've had worse",
    "Ouch!",
    "That's gonna leave a mark...",
    "Nothing you can't handle",
  ],
};

export const BATTLE_STAT_LOOKUP = {
  1: "aggression",
  2: "toughness",
  3: "smarts",
  4: "vitality",
};

export const BATTLE_STEP_SIZE = 5;

export const BATTLE_TYPE_ADVANTAGES = {
  glow: "puff",
  drip: "glow",
  lump: "drip",
  puff: "lump",
};
