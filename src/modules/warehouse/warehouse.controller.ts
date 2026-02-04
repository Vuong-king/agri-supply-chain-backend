import { Request, Response } from "express";
import { WarehouseService } from "./warehouse.service";
import { CreateWarehouseDto } from "./warehouse.dto";


export class WarehouseController {
  static async create(req: Request, res: Response) {
    const { name, address} = req.body as CreateWarehouseDto;

    const warehouse = await WarehouseService.create(req.body);
    return res.status(201).json(warehouse);
  }

  static async findAll(req: Request, res: Response) {
    const warehouses = await WarehouseService.findAll();
    return res.json(warehouses);
  }

static async update(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new Error("Invalid or missing id parameter");
  }

  const warehouse = await WarehouseService.update(id, req.body);
  return res.json(warehouse);
}


  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    
    if(typeof id !== "string") {
      throw new Error("Invalid or missing id parameter");
    }
    await WarehouseService.delete(id);
    return res.json({ message: "Deleted successfully" });
  }
}