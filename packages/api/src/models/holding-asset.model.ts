import { AssetCreateInput } from "@awas/types";
import { Stock } from "@awas/types/src/stock";
import { PrismaClient } from "@prisma/client";
import prisma from "../prisma/client";
import { filterNonNullable } from "../utils";

interface AssetUpsertAllInput extends Omit<AssetCreateInput, "symbol"> {
  stock: Stock;
}

export class HoldingAssetModel {
  readonly prisma: PrismaClient;

  constructor(props?: Partial<HoldingAssetModel>) {
    this.prisma = props?.prisma || prisma;
  }

  async deleteAndCreateAll({ userId, assets }: { userId: number; assets: AssetUpsertAllInput[] }) {
    const deletingAssetsQuery = this.prisma.holdingAsset.deleteMany({ where: { userId } });;
    const creatingAssetsQuery = this.prisma.holdingAsset.createMany({
      data: filterNonNullable(
        assets.map((asset) => ({
          userId,
          stockId: asset.stock.id,
          balance: asset.balance,
          averageTradedPrice: asset.averageTradedPrice,
        }))
      ),
      skipDuplicates: true,
    });
    const deletedAndCreatedAssets = await this.prisma.$transaction([
      deletingAssetsQuery,
      creatingAssetsQuery,
    ]);
    return deletedAndCreatedAssets;
  }
}
