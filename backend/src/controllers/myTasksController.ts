import { prisma } from "../config/prismaClient";
import type { Request, Response, NextFunction } from "express";

export async function myTasks(
  userId: number,
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { perPage, page } = req.params;

    const tasks = await prisma.task.findMany({
      where: {
        userId,
        parentTask: null,
      },
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

export async function myTasksId(
  userId: number,
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!task) {
      res.status(404).json({ errorMessage: "task not found" });
      return;
    } else if (userId != task.userId) {
      res.status(401).json({ errorMessage: "unauthorized" });
      return;
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
}

export async function myTasksCreates(
  userId: number,
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, description } = req.body;

    if (!name) {
      res.status(403).json({ errorMessage: "name required" });
      return;
    } else if (!description) {
      res.status(403).json({ errorMessage: "description required" });
      return;
    }

    await prisma.task.create({
      data: {
        name,
        description,
        userId,
      },
    });

    res.status(201).end();
  } catch (error) {
    next(error);
  }
}

export async function myTasksUpdates(
  userId: number,
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, name, description } = req.body;

    if (!id) {
      res.status(403).json({ errorMessage: "id required" });
      return;
    } else if (!name) {
      res.status(403).json({ errorMessage: "name required" });
      return;
    } else if (!description) {
      res.status(403).json({ errorMessage: "description required" });
      return;
    }

    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      res.status(404).json({ errorMessage: "task not found" });
      return;
    } else if (userId !== task.userId) {
      res.status(401).json({ errorMessage: "unauthorized" });
      return;
    }

    await prisma.task.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });

    res.end();
  } catch (error) {
    next(error);
  }
}

export async function myTasksDeletes(
  userId: number,
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.body;

    if (!id) {
      res.status(403).json({ errorMessage: "id required" });
      return;
    }

    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      res.status(404).json({ errorMessage: "task not found" });
      return;
    } else if (userId !== task.userId) {
      res.status(401).json({ errorMessage: "unauthorized" });
      return;
    }

    await prisma.task.delete({
      where: {
        id,
      },
    });

    res.end();
  } catch (error) {
    next(error);
  }
}
