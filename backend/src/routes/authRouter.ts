import { Router } from "express";
import {
  check,
  signUp,
  signIn,
  signOut,
  forgotPassword,
  forgotPasswordJwt,
} from "../controllers/authController";

const router = Router();

router.post("/check", check);
router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/signOut", signOut);
router.post("/forgotPassword", forgotPassword);
router.put("/forgotPassword/:jwt", forgotPasswordJwt);

export default router;
