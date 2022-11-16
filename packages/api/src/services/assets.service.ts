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
    const assets = await this.holdingAssetModel.findAllByUserId({ userId: user.id });
    const stocks = await this.stockModel.findMany({
      stockIds: assets.map((asset) => asset.stockId),
    });
    return assets.map((asset) => ({
      symbol: stocks.find((stock) => stock.id === asset.stockId)?.symbol,
      balance: asset.balance,
      averageTradedPrice: asset.averageTradedPrice,
    }));
  }

  async updateAllByUser({ uid, assets }: { uid: string; assets: AssetCreateInput[] }) {
    const user = await this.userModel.findOrCreateByUid({ uid });
    if (!user) {
      return { errors: [new Error("Bad User ID")] };
    }

    const stocks = await this.stockModel.findOrCreateMany({
      symbols: assets.map((asset) => asset.symbol),
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
    const upsertAssets = await this.holdingAssetModel.upsetOrDeleteAll({
      userId: user.id,
      assets: creatingAssets,
    });
    return { result: assets.length === upsertAssets.length, errors: null };
  }
}
