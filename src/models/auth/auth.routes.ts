import { authorize } from "./../../middlewares/auth.middleware";
import { Router } from "express";
import { AuthController } from "./auth.controller";
import { autheMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/me", autheMiddleware, AuthController.me);
router.get(
  "/admin-only",
  autheMiddleware,
  authorize(["ADMIN"]),
  AuthController.adminOnly,
);
export default router;
