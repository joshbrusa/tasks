import { Router } from "express";
import {
  myTasks,
  myTasksId,
  myTasksCreates,
  myTasksUpdates,
  myTasksDeletes,
} from "../controllers/myTasksController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/:perPage/:page", authMiddleware, myTasks);
router.get("/:id", authMiddleware, myTasksId);
router.post("/creates", authMiddleware, myTasksCreates);
router.put("/updates", authMiddleware, myTasksUpdates);
router.delete("/deletes", authMiddleware, myTasksDeletes);

export default router;
