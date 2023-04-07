import { Router } from "express";
import {
  reads,
  creates,
  updates,
  deletes,
} from "../controllers/taskController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/reads/:perPage/:page", reads);
router.post("/creates", authMiddleware, creates);
router.put("/updates", authMiddleware, updates);
router.delete("/deletes", authMiddleware, deletes);

export default router;
