export const CONTINENTS = ["America", "Africa", "Europe", "Asia", "Oceania"];
export const DIFFICULTIES = ["easy", "medium", "hard"];

const after = (continent, level, point) => ({ continent, level, point });
const total = (point) => ({ total: point });

export const LEVELS = [
  { continent: "America", level: "easy", unlock: null },
  { continent: "America", level: "medium", unlock: after("America", "easy", 24) },
  { continent: "America", level: "hard", unlock: after("America", "medium", 30) },

  { continent: "Africa", level: "easy", unlock: null },
  { continent: "Africa", level: "medium", unlock: after("Africa", "easy", 24) },
  { continent: "Africa", level: "hard", unlock: after("America", "medium", 30) },

  { continent: "Europe", level: "easy", unlock: after("Africa", "medium", 30) },
  { continent: "Europe", level: "medium", unlock: after("America", "hard", 30) },
  { continent: "Europe", level: "hard", unlock: after("Africa", "hard", 30) },

  { continent: "Asia", level: "easy", unlock: after("Africa", "medium", 30) },
  { continent: "Asia", level: "medium", unlock: after("Europe", "medium", 30) },
  { continent: "Asia", level: "hard", unlock: after("Europe", "hard", 30) },

  { continent: "Oceania", level: "easy", unlock: after("Europe", "hard", 30) },
  { continent: "Oceania", level: "medium", unlock: after("Asia", "medium", 30) },
  { continent: "Oceania", level: "hard", unlock: after("Asia", "hard", 30) },

  { continent: "all", level: "easy", unlock: total(200) },
  { continent: "all", level: "medium", unlock: total(260) },
  { continent: "all", level: "hard", unlock: total(340) },
];
