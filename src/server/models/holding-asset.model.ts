import { PrismaClient, PrismaPromise, Stock } from "@prisma/client";

import { AssetCreateInput } from "../services/assets.service";
import { filterNonNullable } from "../../utils";
import { prisma } from "../db";

interface AssetUpsertAllInput extends Omit<AssetCreateInput, "symbol"> {
  stock: Stock;
}

export class HoldingAssetModel {
  readonly prisma: PrismaClient;

  constructor(props?: Partial<HoldingAssetModel>) {
    this.prisma = props?.prisma || prisma;
  }

  async findAllByUserId({ userId }: { userId: number }) {
    return await this.prisma.holdingAsset.findMany({ where: { userId } });
  }

  async upsetOrDeleteAll({ userId, assets }: { userId: number; assets: AssetUpsertAllInput[] }) {
    const transactionQueries: PrismaPromise<unknown>[] = [];
    const storedAssets = await this.prisma.holdingAsset.findMany({ where: { userId } });

    if (assets.length > 0) {
      const valuesQueryString = assets
        .map(
          (asset) =>
            `(${[
              userId,
              asset.stock.id,
              BigInt(asset.balance),
              parseFloat(String(asset.averageTradedPrice)) || 0,
            ].join(",")})`
        )
        .join(",");
      const upsertAllAssetsQuery = this.prisma.$executeRawUnsafe(`
        INSERT INTO holding_assets (user_id, stock_id, balance, average_traded_price)
        VALUES ${valuesQueryString}
        ON DUPLICATE KEY UPDATE
          balance = VALUES(balance),
          average_traded_price = VALUES(average_traded_price)
        ;
      `);
      transactionQueries.push(upsertAllAssetsQuery);
    }

    const creatingOrUpdatingStockIds = assets.map((asset) => asset.stock.id);
    const deletingAssetIds = filterNonNullable(
      storedAssets.map((storedAsset) => {
        if (creatingOrUpdatingStockIds.includes(storedAsset.stockId)) return;
        return storedAsset.id;
      })
    );
    if (deletingAssetIds.length > 0) {
      const deletingAssetsQuery = this.prisma.holdingAsset.deleteMany({
        where: { id: { in: deletingAssetIds } },
      });
      transactionQueries.push(deletingAssetsQuery);
    }

    const upsetOrDeletedAssets = await this.prisma.$transaction(transactionQueries);
    return upsetOrDeletedAssets;
  }
}
