import { AssetCreateInput } from "@awas/types";
import { Stock } from "@awas/types/src/stock";
import { PrismaClient } from "@prisma/client";
import prisma from "../prisma/client";

interface AssetUpsertAllInput extends Omit<AssetCreateInput, "symbol"> {
  stock: Stock;
}

export class HoldingAssetModel {
  readonly prisma: PrismaClient;

  constructor(props?: Partial<HoldingAssetModel>) {
    this.prisma = props?.prisma || prisma;
  }

  async upsertAll({ userId, assets }: { userId: number; assets: AssetUpsertAllInput[] }) {
    return await this.prisma.$transaction(
      assets.map((asset) =>
        this.prisma.holdingAsset.upsert({
          where: {
            userId_stockId: {
              userId,
              stockId: asset.stock.id,
            },
          },
          create: {
            userId,
            stockId: asset.stock.id,
            balance: asset.balance,
            averageTradedPrice: asset.averageTradedPrice,
          },
          update: {
            balance: asset.balance,
            averageTradedPrice: asset.averageTradedPrice,
          },
        })
      )
    );
  }
}
