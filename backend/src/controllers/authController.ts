import { hashSync, compareSync } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { prisma } from "../config/prismaClient";
import { transport } from "../config/nodemailerTransport";
import type { Request, Response, NextFunction } from "express";

export async function check(req: Request, res: Response, next: NextFunction) {
  try {
    try {
      if (process.env.JWT_SECRET) {
        const decoded: any = verify(req.cookies.jwt, process.env.JWT_SECRET);
        res.json({
          sub: decoded.sub,
          email: decoded.email,
          username: decoded.username,
        });
      }
    } catch (error) {
      res.status(401).json({ message: "unauthorized" });
    }
  } catch (error) {
    next(error);
  }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.body.email.length === 0) {
      res.status(400).json({ message: "email required" });
      return;
    } else if (req.body.password.length === 0) {
      res.status(400).json({ message: "password required" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (user === null) {
      res.status(404).json({ message: "user not found" });
      return;
    } else if (compareSync(req.body.password, user.password) === false) {
      res.status(400).json({ message: "incorrect password" });
      return;
    }

    if (process.env.JWT_SECRET) {
      res.cookie(
        "jwt",
        sign(
          { sub: user.id, email: user.email, username: user.username },
          process.env.JWT_SECRET,
          {
            expiresIn: 60 * 60 * 24,
          }
        ),
        {
          httpOnly: true,
        }
      );
    }

    res.end();
  } catch (error) {
    next(error);
  }
}

export async function signOut(req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie("jwt");
    res.end();
  } catch (error) {
    next(error);
  }
}

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.body.email.length === 0) {
      res.status(400).json({ message: "email required" });
      return;
    } else if (req.body.username.length === 0) {
      res.status(400).json({ message: "username required" });
      return;
    } else if (req.body.password.length === 0) {
      res.status(400).json({ message: "password required" });
      return;
    }

    req.body.password = hashSync(req.body.password, 10);

    await prisma.user.create({
      data: {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      },
    });

    res.status(201).end();
  } catch (error) {
    next(error);
  }
}

export async function forgotPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.body.email.length === 0) {
      res.status(400).json({ message: "email required" });
      return;
    }

    if (process.env.NODEMAILER_SECRET) {
      const jwt = sign(
        { email: req.body.email },
        process.env.NODEMAILER_SECRET,
        { expiresIn: 60 * 10 }
      );
      const url =
        req.protocol + "://" + req.get("host") + req.originalUrl + "/" + jwt;
      console.log(url);

      transport
        .sendMail({
          from: process.env.NODEMAILER_EMAIL,
          to: req.body.email,
          subject: "Josh Tasks Reset Password",
          html: `Click <a href="${url}">here</a> to reset your password.`,
          text: `Use this link to reset your password: ${url}`,
        })
        .catch((error) => {
          console.log("email not sent, message: " + error.message);
        });
    }

    res.end();
  } catch (error) {
    next(error);
  }
}

export async function forgotPasswordJwt(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.body.password.length === 0) {
      res.status(400).json({ message: "password required" });
      return;
    }

    if (process.env.NODEMAILER_SECRET) {
      const decoded: any = verify(
        req.params.jwt,
        process.env.NODEMAILER_SECRET
      );

      req.body.password = hashSync(req.body.password, 10);

      await prisma.user.update({
        where: {
          email: decoded.email,
        },
        data: {
          password: req.body.password,
        },
      });
    }

    res.end();
  } catch (error) {
    next(error);
  }
}
