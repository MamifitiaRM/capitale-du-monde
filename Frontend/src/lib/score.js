export const QUESTIONS_PER_GAME = 10;
export const TIME_PER_QUESTION = 10;
export const STREAK_LENGTH = 3;

const POINT_PER_ANSWER = 3;
const STREAK_BONUS = 3;

export const computeScore = (results) => {
  let point = 0;
  let correct = 0;
  let streak = 0;

  for (const { correct: isCorrect } of results) {
    if (!isCorrect) {
      streak = 0;
      continue;
    }
    correct++;
    streak++;
    point += POINT_PER_ANSWER;
    if (streak === STREAK_LENGTH) {
      point += STREAK_BONUS;
      streak = 0;
    }
  }

  return { point, correct, streak };
};
