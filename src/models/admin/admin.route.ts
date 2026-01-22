import { Router } from "express";
import { AdminController } from "./admin.controller";
import { autheMiddleware, authorize } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/users",autheMiddleware, authorize(["ADMIN"]), AdminController.getUsers)
router.put("/users/:id", autheMiddleware, authorize(["ADMIN"]), AdminController.updateRole)
router.delete("/users/:id", autheMiddleware, authorize(["ADMIN"]), AdminController.deleteUser)

export default router;