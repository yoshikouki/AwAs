/*
  Warnings:

  - You are about to drop the column `stockId` on the `holding_assets` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `holding_assets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,stock_id]` on the table `holding_assets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stock_id` to the `holding_assets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `holding_assets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "holding_assets" DROP CONSTRAINT "holding_assets_stockId_fkey";

-- DropForeignKey
ALTER TABLE "holding_assets" DROP CONSTRAINT "holding_assets_userId_fkey";

-- DropIndex
DROP INDEX "holding_assets_userId_stockId_key";

-- AlterTable
ALTER TABLE "holding_assets" DROP COLUMN "stockId",
DROP COLUMN "userId",
ADD COLUMN     "stock_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "holding_assets_user_id_stock_id_key" ON "holding_assets"("user_id", "stock_id");

-- AddForeignKey
ALTER TABLE "holding_assets" ADD CONSTRAINT "holding_assets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holding_assets" ADD CONSTRAINT "holding_assets_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "stocks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
