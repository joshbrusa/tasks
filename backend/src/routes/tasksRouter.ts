import { Router } from "express";
import { tasks, tasksId } from "../controllers/taskController";

const router = Router();

router.get("/:perPage/:page", tasks);
router.get("/:id", tasksId);

export default router;
