import { AssetCreateInput } from "@awas/types/src/assets";
import { HoldingAssetModel } from "../models/holding-asset.model";
import { StockModel } from "../models/stock.model";
import { UserModel } from "../models/user.model";
import { filterNonNullable } from "../utils";

export class AssetsService {
  readonly userModel: UserModel;
  readonly holdingAssetModel: HoldingAssetModel;
  readonly stockModel: StockModel;

  constructor(props?: Partial<AssetsService>) {
    this.userModel = props?.userModel || new UserModel();
    this.holdingAssetModel = props?.holdingAssetModel || new HoldingAssetModel();
    this.stockModel = props?.stockModel || new StockModel();
  }

  async getAllByUser({ uid }: { uid: string }) {
    const user = await this.userModel.findOrCreateByUid({ uid });
    return [
      {
        symbol: "VTI",
        name: "バンガード・トータル・ストック・マーケットETF",
        balance: 34,
        averageTradedPrice: 210.2426,
        marketPrice: 188.93,
        marketValue: 6423.62,
        return: -724.62,
        yieldPercentage: -10.13,
      },
      {
        symbol: "XOM",
        name: "エクソンモービル",
        balance: 113,
        averageTradedPrice: 54.3089,
        marketPrice: 112.34,
        marketValue: 12694.42,
        return: 6557.51,
        yieldPercentage: 106.85,
      },
      {
        symbol: "SPYD",
        name: "SPDR ポートフォリオS&P 500 高配当株式ETF",
        balance: 212,
        averageTradedPrice: 27.71,
        marketPrice: 38.88,
        marketValue: 1208.359,
        return: 2368.04,
        yieldPercentage: 40.31,
      },
    ];
  }

  async updateAllByUser({ uid, assets }: { uid: string; assets: AssetCreateInput[] }) {
    const user = await this.userModel.findOrCreateByUid({ uid });
    if (!user) {
      return { errors: [new Error("Bad User ID")] };
    }

    const stocks = await this.stockModel.findOrCreateMany({
      symbols: assets.map(asset => asset.symbol),
    });
    const creatingAssets = filterNonNullable(
      assets.map((asset) => {
        const stock = stocks.find((stock) => stock.symbol === asset.symbol);
        if (!stock) return;
        return {
          stock,
          balance: asset.balance,
          averageTradedPrice: asset.averageTradedPrice,
        };
      })
    );
    const upsertAssets = await this.holdingAssetModel.upsertAll({
      userId: user.id,
      assets: creatingAssets,
    });
    return { result: assets.length === upsertAssets.length, errors: null };
  }
}
