import { Router } from "express";
import { autheMiddleware, authorize } from "../../middlewares/auth.middleware";
import { WarehouseController } from "./warehouse.controller";

const router = Router();

router.use(autheMiddleware);

router.post("/", authorize(["ADMIN", "MANAGER"]), WarehouseController.create);
router.get("/", authorize(["ADMIN", "MANAGER", "USER"]), WarehouseController.findAll);
router.put("/:id", authorize(["ADMIN", "MANAGER"]), WarehouseController.update);
router.delete("/:id", authorize(["ADMIN"]), WarehouseController.delete);

export default router;