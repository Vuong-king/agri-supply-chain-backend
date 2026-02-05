import { Router } from "express";
import { autheMiddleware, authorize } from "../../middlewares/auth.middleware";
import { InventoryController } from "./inventory.controller";

const router = Router();

router.use(autheMiddleware);

router.post(
  "/import",
  authorize(["ADMIN", "MANAGER"]),
  InventoryController.import,
);

router.get(
  "/",
  authorize(["ADMIN", "MANAGER", "STAFF"]),
  InventoryController.findAll,
);

router.get(
  "/:id/logs",
  authorize(["ADMIN", "MANAGER"]),
  InventoryController.logs,
);

export default router;
