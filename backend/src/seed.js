import "dotenv/config";
import mongoose from "mongoose";
import CountryQuestion from "./model/question.model.js";
import { COUNTRIES } from "./data/countries.js";
import { shuffleArray } from "./utils/shuffleArray.js";

const capitalsByContinent = COUNTRIES.reduce((pools, [, capital, continent]) => {
  (pools[continent] ??= []).push(capital);
  return pools;
}, {});

const questions = COUNTRIES.map(([country, capital, continent, difficulty]) => {
  const wrongAnswers = shuffleArray(
    capitalsByContinent[continent].filter((item) => item !== capital)
  ).slice(0, 3);

  return {
    country,
    continent,
    difficulty,
    correctAnswer: capital,
    options: shuffleArray([capital, ...wrongAnswers]),
  };
});

await mongoose.connect(process.env.MONGODB_URI);

await CountryQuestion.bulkWrite(
  questions.map((question) => ({
    updateOne: {
      filter: { country: question.country },
      update: { $set: question },
      upsert: true,
    },
  }))
);

console.log(`${questions.length} questions importées`);
await mongoose.disconnect();
