import { continentLabels, levelLabels } from "#data";

export const getBest = (user, continent, level) =>
  user.points.find((item) => item.continent === continent && item.level === level)
    ?.point ?? 0;

export const getContinentPoints = (user, continent) =>
  user.points
    .filter((item) => item.continent === continent)
    .reduce((sum, item) => sum + item.point, 0);

export const getUnlockProgress = (unlock, user) => {
  if (unlock.total !== undefined) {
    return { current: user.totalPoint, goal: unlock.total };
  }
  return {
    current: getBest(user, unlock.continent, unlock.level),
    goal: unlock.point,
  };
};

export const describeUnlock = (unlock) => {
  if (unlock.total !== undefined) {
    return `Cumulez au moins ${unlock.total} points sur l'ensemble du jeu`;
  }
  const level = levelLabels[unlock.level].toLowerCase();
  const continent = continentLabels[unlock.continent];
  return `Obtenez au moins ${unlock.point} points au niveau ${level} du continent ${continent}`;
};
