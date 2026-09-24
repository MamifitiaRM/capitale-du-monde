import express from "express";
import rateLimit from "express-rate-limit";
import {
  actualUser,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import authentication from "../middleware/authentification.js";

const route = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Trop de tentatives, réessayez dans quelques minutes",
  },
});

route.get("/", authentication, actualUser);
route.post("/register", authLimiter, register);
route.post("/login", authLimiter, login);
route.post("/logout", logout);

export default route;
