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
      res.status(401).json({ errorMessage: "unauthorized" });
    }
  } catch (error) {
    next(error);
  }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    if (!email) {
      res.status(403).json({ errorMessage: "email required" });
      return;
    } else if (!password) {
      res.status(403).json({ errorMessage: "password required" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user === null) {
      res.status(404).json({ errorMessage: "user not found" });
      return;
    } else if (compareSync(password, user.password) === false) {
      res.status(403).json({ errorMessage: "incorrect password" });
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
    const { email, username, password } = req.body;

    if (!email) {
      res.status(403).json({ errorMessage: "email required" });
      return;
    } else if (!username) {
      res.status(403).json({ errorMessage: "username required" });
      return;
    } else if (!password) {
      res.status(403).json({ errorMessage: "password required" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      res.status(403).json({ errorMessage: "user already exists" });
      return;
    }

    await prisma.user.create({
      data: {
        email: req.body.email,
        username: req.body.username,
        password: hashSync(password, 10),
      },
    });

    res.status(201).end();
  } catch (error) {
    next(error);
  }
}

export async function changePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(403).json({ errorMessage: "email required" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(404).json({ errorMessage: "user not found" });
      return;
    }

    if (process.env.NODEMAILER_SECRET) {
      const jwt = sign({ email: email }, process.env.NODEMAILER_SECRET, {
        expiresIn: 60 * 10,
      });

      const url = `${req.get("origin")}/changePassword/${jwt}/`;

      try {
        transport.sendMail({
          from: process.env.NODEMAILER_EMAIL,
          to: email,
          subject: "Tasks Change Password",
          html: `Click <a href="${url}">here</a> to change your password.`,
          text: `Use this link to change your password: ${url}`,
        });
      } catch {
        res.status(400).json({ errorMessage: "email not sent" });
        return;
      }
    }

    res.json({ successMessage: "email sent" });
  } catch (error) {
    next(error);
  }
}

export async function changePasswordJwt(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { password } = req.body;

    if (!password) {
      res.status(403).json({ errorMessage: "password required" });
      return;
    }

    if (process.env.NODEMAILER_SECRET) {
      const decoded: any = verify(
        req.params.jwt,
        process.env.NODEMAILER_SECRET
      );

      const user = await prisma.user.findUnique({
        where: {
          email: decoded.email,
        },
      });

      if (!user) {
        res.status(404).json({ errorMessage: "user not found" });
        return;
      }

      await prisma.user.update({
        where: {
          email: decoded.email,
        },
        data: {
          password: hashSync(password, 10),
        },
      });
    }

    res.end();
  } catch (error) {
    next(error);
  }
}
