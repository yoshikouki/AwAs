/*
  Warnings:

  - You are about to drop the column `averageTradedPrice` on the `holding_assets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "holding_assets" DROP COLUMN "averageTradedPrice",
ADD COLUMN     "average_traded_price" DOUBLE PRECISION;
