import type { Request, Response, NextFunction } from "express";

type Error = {
  status?: number;
  message?: String;
};

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error.message);
  const status = error.status || 500;
  res.status(status).json({ message: "internal server error" });
}
