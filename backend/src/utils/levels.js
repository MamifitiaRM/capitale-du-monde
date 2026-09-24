import { LEVELS } from "../data/levels.js";

export const findLevel = (continent, level) =>
  LEVELS.find((item) => item.continent === continent && item.level === level);

export const getBestPoint = (user, continent, level) =>
  user.points.find((item) => item.continent === continent && item.level === level)
    ?.point ?? 0;

export const isUnlocked = (user, { unlock }) => {
  if (!unlock) return true;
  if (unlock.total !== undefined) return user.totalPoint >= unlock.total;
  return getBestPoint(user, unlock.continent, unlock.level) >= unlock.point;
};
