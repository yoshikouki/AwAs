import { PrismaClient, Stock } from "@prisma/client";
import { FmpApi } from "../lib/fmp-api";
import prisma from "../prisma/client";
import { filterNonNullable } from "../utils";

export class DailyStockPriceModel {
  readonly prisma: PrismaClient;
  readonly fmpApi: FmpApi;

  constructor(props?: Partial<DailyStockPriceModel>) {
    this.prisma = props?.prisma || prisma;
    this.fmpApi = props?.fmpApi || new FmpApi();
  }

  async findOrCreateLatestPrices({ stocks }: { stocks: Stock[] }) {
    const storedPrices = await this.prisma.dailyStockPrice.findMany({
      where: {
        stockId: {
          in: stocks.map((stock) => stock.id),
        },
      },
    });
    const storedStockIds = storedPrices.map((price) => price.stockId);
    const nonExistingStocks = filterNonNullable(stocks.filter((stock) => !storedStockIds.includes(stock.id)));
    await this.prisma.dailyStockPrice.createMany({
      data: nonExistingStocks.map((stock) => ({
        stockId: stock.id,
        date: new Date(2022, 11, 23),
        close: 11.23,
      })),
    });
    return [];
  }
}
