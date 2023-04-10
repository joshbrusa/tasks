import { prisma } from "../config/prismaClient";
import type { Request, Response, NextFunction } from "express";

export async function tasks(req: Request, res: Response, next: NextFunction) {
  try {
    const { perPage, page } = req.params;

    const tasks = await prisma.task.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      skip: parseInt(perPage) * parseInt(page),
      take: parseInt(perPage),
    });

    res.json(tasks);
  } catch (error) {
    next(error);
  }
}

export async function tasksId(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        name: true,
        description: true,
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!task) {
      res.status(404).json({ errorMessage: "task not found" });
      return;
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
}
