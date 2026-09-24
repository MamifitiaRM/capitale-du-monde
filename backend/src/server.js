import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import connectDB from "./lib/db.js";
import authRoute from "./routes/auth.route.js";
import levelRoute from "./routes/level.route.js";
import questionRoute from "./routes/quiz.route.js";
import leaderboardRoute from "./routes/leaderboard.route.js";
import { errorHandler, notFound } from "./middleware/error.js";

const PORT = process.env.PORT || 3000;
const app = express();
app.set("trust proxy", 1);

app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/level", levelRoute);
app.use("/api/question", questionRoute);
app.use("/api/leaderboard", leaderboardRoute);

app.use(notFound);
app.use(errorHandler);

await connectDB();

app.listen(PORT, () => {
  console.log("Le serveur est en marche sur http://localhost:" + PORT);
});
