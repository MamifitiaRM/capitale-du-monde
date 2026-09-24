import mongoose from "mongoose";
import CountryQuestion from "../model/question.model.js";
import { shuffleArray } from "../utils/shuffleArray.js";
import { computeScore } from "../utils/score.js";
import { findLevel, isUnlocked } from "../utils/levels.js";

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 20;

const badRequest = (res, message) =>
  res.status(400).json({ success: false, message });

const resolveLevel = (req, res, continent, level) => {
  const levelInfo = findLevel(continent, level);
  if (!levelInfo) {
    badRequest(res, "Continent ou niveau invalide");
    return null;
  }
  if (!isUnlocked(req.user, levelInfo)) {
    res.status(403).json({ success: false, message: "Ce niveau est verrouillé" });
    return null;
  }
  return levelInfo;
};

export const getRandomQuestions = async (req, res) => {
  const { continent, difficulty } = req.query;
  const limit = Math.min(
    Math.max(Number(req.query.limit) || DEFAULT_LIMIT, 1),
    MAX_LIMIT
  );

  if (!resolveLevel(req, res, continent, difficulty)) return;

  const filter = { difficulty };
  if (continent !== "all") filter.continent = continent;

  const questions = await CountryQuestion.aggregate([
    { $match: filter },
    { $sample: { size: limit } },
    { $project: { country: 1, options: 1 } },
  ]);

  res.json({
    success: true,
    questions: questions.map((question) => ({
      ...question,
      options: shuffleArray(question.options),
    })),
  });
};

export const checkAnswer = async (req, res) => {
  const { questionId, answer } = req.body ?? {};

  if (!mongoose.isValidObjectId(questionId)) {
    return badRequest(res, "Question invalide");
  }

  const question = await CountryQuestion.findById(questionId).select(
    "correctAnswer"
  );
  if (!question) {
    return res
      .status(404)
      .json({ success: false, message: "Question introuvable" });
  }

  res.json({
    success: true,
    correct: answer === question.correctAnswer,
    correctAnswer: question.correctAnswer,
  });
};

export const applyPoint = async (req, res) => {
  const { continent, level, answers } = req.body ?? {};

  if (!Array.isArray(answers) || answers.length > MAX_LIMIT) {
    return badRequest(res, "Réponses invalides");
  }
  if (!resolveLevel(req, res, continent, level)) return;

  const seen = new Set();
  const submitted = answers.filter(({ questionId } = {}) => {
    if (!mongoose.isValidObjectId(questionId) || seen.has(questionId)) {
      return false;
    }
    seen.add(questionId);
    return true;
  });

  const filter = { _id: { $in: [...seen] }, difficulty: level };
  if (continent !== "all") filter.continent = continent;

  const questions = await CountryQuestion.find(filter).select("correctAnswer");
  const correctAnswers = new Map(
    questions.map((question) => [String(question._id), question.correctAnswer])
  );

  const results = submitted
    .filter(({ questionId }) => correctAnswers.has(questionId))
    .map(({ questionId, answer }) => answer === correctAnswers.get(questionId));

  const { point, bonus, correct } = computeScore(results);

  const user = req.user;
  const entry = user.points.find(
    (item) => item.continent === continent && item.level === level
  );
  const previousBest = entry?.point ?? 0;
  const isNewBest = point > previousBest;

  if (isNewBest) {
    if (entry) entry.point = point;
    else user.points.push({ continent, level, point });
    user.totalPoint = user.points.reduce((sum, item) => sum + item.point, 0);
    await user.save();
  }

  res.json({
    success: true,
    point,
    bonus,
    correct,
    answered: results.length,
    best: Math.max(point, previousBest),
    isNewBest,
    user,
  });
};
