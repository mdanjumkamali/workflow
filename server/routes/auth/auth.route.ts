import { SignUp, Login } from "../../controllers/auth/auth.controller";
import { Router } from "express";

const router = Router();

router.post("/signup", SignUp);
router.post("/login", Login);

export default router;
