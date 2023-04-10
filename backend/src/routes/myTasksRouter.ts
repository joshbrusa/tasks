import { Router } from "express";
import {
  myTasks,
  myTasksId,
  myTasksCreates,
  myTasksIdUpdates,
  myTasksIdDeletes,
} from "../controllers/myTasksController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/:perPage/:page", authMiddleware, myTasks);
router.post("/creates", authMiddleware, myTasksCreates);
router.get("/:id", authMiddleware, myTasksId);
router.put("/:id/updates", authMiddleware, myTasksIdUpdates);
router.delete("/:id/deletes", authMiddleware, myTasksIdDeletes);

export default router;
