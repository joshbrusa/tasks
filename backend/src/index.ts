import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import authRouter from "./routes/authRouter";
import tasksRouter from "./routes/tasksRouter";
import myTasksRouter from "./routes/myTasksRouter";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/auth", authRouter);
app.use("/tasks", tasksRouter);
app.use("/myTasks", myTasksRouter);

// error middleware, keep at end
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("server listening on port", process.env.PORT);
});
