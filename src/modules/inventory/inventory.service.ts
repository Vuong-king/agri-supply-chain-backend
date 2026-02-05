import prisma from "../../config/prisma";
import { ImportInventoryDto } from "./inventory.dto";
import { StockAction } from "@prisma/client";

export class InventoryService {

  // ================= IMPORT =================
  static async importStock(
    data: ImportInventoryDto,
    userId: string
  ) {
    const { productId, warehouseId, quantity, reason } = data;

    if (quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }

    return prisma.$transaction(async (tx) => {

      let inventory = await tx.inventory.findUnique({
        where: {
          productId_warehouseId: {
            productId,
            warehouseId,
          },
        },
      });

      // nếu chưa có inventory → tạo
      if (!inventory) {
        inventory = await tx.inventory.create({
          data: {
            productId,
            warehouseId,
            physicalStock: quantity,
            availableStock: quantity,
          },
        });
      } else {
        inventory = await tx.inventory.update({
          where: { id: inventory.id },
          data: {
            physicalStock: { increment: quantity },
            availableStock: { increment: quantity },
          },
        });
      }

      // ghi log
      await tx.inventoryLog.create({
        data: {
          inventoryId: inventory.id,
          change: quantity,
          type: StockAction.IMPORT,
          reason,
          createdBy: userId,
        },
      });

      return inventory;
    });
  }

  // ================= VIEW =================
  static async findAll() {
    return prisma.inventory.findMany({
      include: {
        product: true,
        warehouse: true,
      },
      orderBy: { updatedAt: "desc" },
    });
  }

  // ================= LOG =================
  static async getLogs(inventoryId: string) {
    return prisma.inventoryLog.findMany({
      where: { inventoryId },
      orderBy: { createdAt: "desc" },
    });
  }
}
