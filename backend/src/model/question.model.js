import mongoose from "mongoose";
import { CONTINENTS, DIFFICULTIES } from "../data/levels.js";

const countryQuestionSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => value.length === 4,
        message: "Une question doit avoir exactement 4 choix",
      },
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: DIFFICULTIES,
      default: "easy",
    },
    continent: {
      type: String,
      enum: CONTINENTS,
      required: true,
    },
  },
  { timestamps: true }
);

countryQuestionSchema.index({ continent: 1, difficulty: 1 });

const CountryQuestion = mongoose.model(
  "CountryQuestion",
  countryQuestionSchema
);

export default CountryQuestion;
