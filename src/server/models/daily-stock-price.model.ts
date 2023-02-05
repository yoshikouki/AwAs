import { AlpacaApi, alpacaApi } from "../../lib/alpaca-api";
import { PrismaClient, Stock } from "@prisma/client";

import { compareDesc } from "date-fns";
import { filterNonNullable } from './../../utils/index';
import { prisma } from "../db";

export class DailyStockPriceModel {
  readonly prisma: PrismaClient;
  readonly alpacaApi: AlpacaApi;

  constructor(props?: Partial<DailyStockPriceModel>) {
    this.prisma = props?.prisma || prisma;
    this.alpacaApi = props?.alpacaApi || alpacaApi;
  }

  async findOrCreateLatestPrices({ stocks }: { stocks: Stock[] }) {
    // TODO: 前営業日の日付指定
    const storedPrices = await this.prisma.dailyStockPrice.findMany({
      where: {
        stockId: {
          in: stocks.map((stock) => stock.id),
        },
      },
    });
    const storedStockIds = storedPrices.map((price) => price.stockId);
    const nonExistingStocks = stocks.filter((stock) => !storedStockIds.includes(stock.id));
    if (nonExistingStocks.length === 0) {
      return storedPrices;
    } else {
      await this.fetchAndCreateLatestClosePrices({ stocks: nonExistingStocks });
      return await this.prisma.dailyStockPrice.findMany({
        where: {
          stockId: {
            in: stocks.map((stock) => stock.id),
          },
        },
      });
    }
  }

  async fetchAndCreateLatestClosePrices({ stocks }: { stocks: Stock[] }) {
    const barsOfStocks = await this.alpacaApi.getMultiBars(stocks.map((stock) => stock.symbol));
    // TODO: 市場が開いているときに ClosePrice がどのような値となるかを検証する。
    await this.prisma.dailyStockPrice.createMany({
      data: filterNonNullable(stocks.map((stock) => {
        const latestBar = barsOfStocks[stock.symbol.toUpperCase()]?.sort((a, b) =>
          compareDesc(new Date(a.Timestamp), new Date(b.Timestamp))
        )[0];
        if (!latestBar) return;
        return {
          stockId: stock.id,
          date: new Date(latestBar.Timestamp),
          open: latestBar.OpenPrice,
          close: latestBar.ClosePrice,
          high: latestBar.HighPrice,
          low: latestBar.LowPrice,
          volume: latestBar.Volume,
          vwap: latestBar.VWAP,
        };
      })),
    });
  }
}
