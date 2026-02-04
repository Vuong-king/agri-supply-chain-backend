import prisma from "../../config/prisma";

export class WarehouseService {
  static async create(data: { name: string; address: string }) {
    return prisma.warehouse.create({
      data,
    });
  }
  static async findAll() {
    return prisma.warehouse.findMany({
        orderBy: { createdAt: "desc" },
    });
  }
  static async update(id: string, data: any){
    return prisma.warehouse.update({
        where: { id },
        data,
    });
  }
  static async delete(id: string){
    return prisma.warehouse.delete({
        where: { id },
    });
  }
}
