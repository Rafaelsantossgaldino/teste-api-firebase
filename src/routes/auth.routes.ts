import { Router } from "express";
import { registerUser, loginUser, recoverAccount } from "../controllers/AuthController";

const router = Router();

router.post("/created_user", registerUser);
router.post("/login_user", loginUser);
router.post("/recover_account", recoverAccount);

export default router;