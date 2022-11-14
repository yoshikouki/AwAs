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

  async upsertAll({ userId, assets }: { userId: number; assets: AssetUpsertAllInput[] }) {
    const storedAssets = await this.prisma.holdingAsset.findMany({
      where: {
        userId,
        stockId: {
          in: assets.map((asset) => asset.stock.id),
        },
      },
    });
    const updatingAssetsQueries = storedAssets.map((storedAsset) => {
      const updatingAsset = assets.find(asset => asset.stock.id === storedAsset.stockId)
      return this.prisma.holdingAsset.update({
        where: {
          id: storedAsset.id,
        },
        data: {
          balance: updatingAsset?.balance,
          averageTradedPrice: updatingAsset?.averageTradedPrice,
        },
      })
    });
    const creatingStocksAttributes = filterNonNullable(
      assets.map((asset) => {
        if (storedAssets.find((storedAsset) => storedAsset.stockId === asset.stock.id)) return;
        return {
          userId,
          stockId: asset.stock.id,
          balance: asset.balance,
          averageTradedPrice: asset.averageTradedPrice,
        };
      })
    );
    const creatingAssetsQuery = this.prisma.holdingAsset.createMany({
      data: creatingStocksAttributes,
      skipDuplicates: true,
    });
    const createdOrUpdatedAssets = await this.prisma.$transaction([
      creatingAssetsQuery,
      ...updatingAssetsQueries,
    ]);
    return createdOrUpdatedAssets;
  }
}
