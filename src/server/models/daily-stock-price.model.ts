import { PrismaClient, Stock } from "@prisma/client";
import { compareDesc, parseJSON } from "date-fns";

import { alpacaApi } from "../../lib/alpaca-api";
import { filterNonNullable } from "./../../utils/index";
import { prisma } from "../db";

interface PriceBySymbol {
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  timestamp: string;
  vWap: number;
  tradeCount: number;
}

export class DailyStockPriceModel {
  readonly prisma: PrismaClient;
  readonly alpacaApi: typeof alpacaApi;

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
    const nonExistingStocks = stocks.filter(
      (stock) => !storedStockIds.includes(stock.id)
    );
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
    const barsOfStocks = await this.alpacaApi.getMultiBars({
      symbols: stocks.map((stock) => stock.symbol),
    });
    // TODO: 市場が開いているときに ClosePrice がどのような値となるかを検証する。
    await this.prisma.dailyStockPrice.createMany({
      data: filterNonNullable(
        stocks.map((stock) => {
          const latestBar = barsOfStocks[stock.symbol.toUpperCase()]?.sort(
            (a, b) => compareDesc(new Date(a.Timestamp), new Date(b.Timestamp))
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
        })
      ),
    });
  }

  async fetchLatestDailyPriceBySymbols(symbols: string[]): Promise<{
    [key: string]: PriceBySymbol | undefined;
  }> {
    const fetchedLatestPrices = await alpacaApi.getMultiBars({ symbols });
    const latestPrices: { [key: string]: PriceBySymbol } = Object.fromEntries(
      Object.entries(fetchedLatestPrices).map(([symbol, alpacaBars]) => {
        const latestDailyPrice = alpacaBars.sort((bar1, bar2) =>
          compareDesc(parseJSON(bar1.Timestamp), parseJSON(bar2.Timestamp))
        )[0];
        return [
          symbol,
          latestDailyPrice && Object.fromEntries(
            Object.entries(latestDailyPrice).map(([key, value]) => {
              return [
                this.alpacaKeysTableForLatestDailyPriceBySymbols[key],
                value,
              ];
            })
          ),
        ];
      })
    );
    return latestPrices;
  }

  alpacaKeysTableForLatestDailyPriceBySymbols: { [K: string]: string } = {
    Symbol: "symbol",
    OpenPrice: "open",
    HighPrice: "high",
    LowPrice: "low",
    ClosePrice: "close",
    Volume: "volume",
    Timestamp: "timestamp",
    VWAP: "vWap",
    TradeCount: "tradeCount",
  };
}
