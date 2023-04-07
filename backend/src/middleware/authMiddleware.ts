import { verify } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    try {
      if (process.env.JWT_SECRET) {
        const decoded = verify(req.cookies.jwt, process.env.JWT_SECRET);
        next(decoded.sub);
      }
    } catch (error) {
      res.status(401).json({ errorMessage: "unauthorized" });
    }
  } catch (error) {
    next(error);
  }
}
