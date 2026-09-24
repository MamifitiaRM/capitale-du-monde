const POINT_PER_ANSWER = 3;
const STREAK_LENGTH = 3;
const STREAK_BONUS = 3;

export const computeScore = (results) => {
  let point = 0;
  let bonus = 0;
  let correct = 0;
  let streak = 0;

  for (const isCorrect of results) {
    if (!isCorrect) {
      streak = 0;
      continue;
    }
    correct++;
    streak++;
    point += POINT_PER_ANSWER;
    if (streak === STREAK_LENGTH) {
      point += STREAK_BONUS;
      bonus += STREAK_BONUS;
      streak = 0;
    }
  }

  return { point, bonus, correct };
};
