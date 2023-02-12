import { DailyStockPriceModel } from "../models/daily-stock-price.model";

export class PricesService {
  readonly dailyStockPriceModel: DailyStockPriceModel;

  constructor(props?: Partial<PricesService>) {
    this.dailyStockPriceModel = props?.dailyStockPriceModel || new DailyStockPriceModel();
  }

  async getLatestAllBySymbols(symbols: string[]) {
    const latestDailyPrices = await this.dailyStockPriceModel.fetchLatestDailyPriceBySymbols(symbols);
    return latestDailyPrices;
  }
}
