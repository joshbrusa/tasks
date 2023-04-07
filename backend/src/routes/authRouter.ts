import { Router } from "express";
import {
  check,
  signUp,
  signIn,
  signOut,
  changePassword,
  changePasswordJwt,
} from "../controllers/authController";

const router = Router();

router.post("/check", check);
router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/signOut", signOut);
router.post("/changePassword", changePassword);
router.put("/changePassword/:jwt", changePasswordJwt);

export default router;
