import express from "express";
import { getLevels } from "../controllers/level.controller.js";
import authentication from "../middleware/authentification.js";

const route = express.Router();

route.get("/", authentication, getLevels);

export default route;
