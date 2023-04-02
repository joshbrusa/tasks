import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

// error middleware, keep at end
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("server listening on port", process.env.PORT);
});
