import { LEVELS } from "../data/levels.js";
import { getBestPoint, isUnlocked } from "../utils/levels.js";

export const getLevels = (req, res) => {
  const levels = LEVELS.map(({ continent, level, unlock }) => ({
    continent,
    level,
    unlock,
    isLocked: !isUnlocked(req.user, { unlock }),
    best: getBestPoint(req.user, continent, level),
  }));
  res.json({ success: true, levels });
};
