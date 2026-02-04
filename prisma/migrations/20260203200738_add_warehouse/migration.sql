-- CreateEnum
CREATE TYPE "WarehouseStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Warehouse" ADD COLUMN     "status" "WarehouseStatus" NOT NULL DEFAULT 'ACTIVE';
