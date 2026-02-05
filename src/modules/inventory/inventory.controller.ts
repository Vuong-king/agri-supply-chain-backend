import { Response } from "express";
import { InventoryService } from "./inventory.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

export class InventoryController {
  static async import(req: AuthRequest, res: Response) {
    const inventory = await InventoryService.importStock(
      req.body,
      req.user!.id,
    );
    return res.status(201).json(inventory);
  }

  static async findAll(req:AuthRequest, res: Response) {
    const inventories = await InventoryService.findAll();
    return res.status(200).json(inventories);
  }

  static async logs(req:AuthRequest, res: Response) {
    const {id} = req.params;
    if(typeof id !== "string"){
        throw new Error("Invalid ID");
    }
    const logs = await InventoryService.getLogs(id);
    return res.status(200).json(logs);
  }
}
