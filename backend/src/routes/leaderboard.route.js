import express from "express";
import { getLeaderboard } from "../controllers/leaderboard.controller.js";
import authentication from "../middleware/authentification.js";

const route = express.Router();

route.get("/", authentication, getLeaderboard);

export default route;
