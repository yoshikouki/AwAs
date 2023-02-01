import { DailyStockPriceModel } from "../models/daily-stock-price.model";
import { StockModel } from "../models/stock.model";

export class PricesService {
  readonly stockModel: StockModel;
  readonly dailyStockPriceModel: DailyStockPriceModel;

  constructor(props?: Partial<PricesService>) {
    this.stockModel = props?.stockModel || new StockModel();
    this.dailyStockPriceModel = props?.dailyStockPriceModel || new DailyStockPriceModel();
  }

  async getAllBySymbols(symbols: string[]) {
    const stocks = await this.stockModel.findAllBySymbolsWithLatestDailyPrice(symbols);
    const result = stocks.map((stock) => {
      const currentDailyStockPrice = stock.dailyStockPrices[0]
      return {
        symbol: stock.symbol,
        date: currentDailyStockPrice?.date,
        close: currentDailyStockPrice?.close,
      };
    });
    return result;
  }
}
