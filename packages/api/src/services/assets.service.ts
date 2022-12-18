import { AssetCreateInput } from "@awas/types/src/assets";
import { DailyStockPriceModel } from "../models/daily-stock-price.model";
import { HoldingAssetModel } from "../models/holding-asset.model";
import { StockModel } from "../models/stock.model";
import { UserModel } from "../models/user.model";
import { filterNonNullable } from "../utils";

export class AssetsService {
  readonly userModel: UserModel;
  readonly holdingAssetModel: HoldingAssetModel;
  readonly stockModel: StockModel;
  readonly dailyStockPriceModel: DailyStockPriceModel;

  constructor(props?: Partial<AssetsService>) {
    this.userModel = props?.userModel || new UserModel();
    this.holdingAssetModel = props?.holdingAssetModel || new HoldingAssetModel();
    this.stockModel = props?.stockModel || new StockModel();
    this.dailyStockPriceModel = props?.dailyStockPriceModel || new DailyStockPriceModel();
  }

  async getAllByUser({ uid }: { uid: string }) {
    const user = await this.userModel.findOrCreateByUid({ uid });
    const assets = await this.holdingAssetModel.findAllByUserId({ userId: user.id });
    const stocks = await this.stockModel.findAll({
      stockIds: assets.map((asset) => asset.stockId),
    });
    const dailyStockPrices = await this.dailyStockPriceModel.findOrCreateLatestPrices({ stocks });
    const all = assets.map((asset) => {
      const stock = stocks.find((stock) => stock.id === asset.stockId);
      const currentDailyStockPrice = dailyStockPrices.find(
        (dailyStockPrice) => dailyStockPrice.stockId === stock?.id
      );
      const marketPrice = currentDailyStockPrice?.close || 0;
      const marketValue = Number(asset.balance) * marketPrice;
      const profitLoss = asset.averageTradedPrice
        ? Number(asset.balance) * (marketPrice - asset.averageTradedPrice)
        : 0;
      const profitLossPercentage = asset.averageTradedPrice
        ? (profitLoss / asset.averageTradedPrice) * 100
        : 0;
      return {
        symbol: stock?.symbol,
        balance: asset.balance,
        averageTradedPrice: asset.averageTradedPrice,
        marketPrice,
        marketValue,
        profitLoss,
        profitLossPercentage,
      };
    });
    return all;
  }

  async updateAllByUser({ uid, assets }: { uid: string; assets: AssetCreateInput[] }) {
    const user = await this.userModel.findOrCreateByUid({ uid });
    if (!user) {
      return { errors: [new Error("Bad User ID")] };
    }

    const stocks = await this.stockModel.findOrCreateAll({
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
