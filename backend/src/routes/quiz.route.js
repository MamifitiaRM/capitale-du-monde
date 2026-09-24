import express from "express";
import {
  applyPoint,
  checkAnswer,
  getRandomQuestions,
} from "../controllers/question.controller.js";
import authentication from "../middleware/authentification.js";

const route = express.Router();

route.use(authentication);

route.get("/random", getRandomQuestions);
route.post("/check", checkAnswer);
route.put("/applyPoint", applyPoint);

export default route;
