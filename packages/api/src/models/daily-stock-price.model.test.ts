import { describe, expect, test, vi } from "vitest";
import { alpacaApi } from "../lib/alpaca-api";
import prisma from "../prisma/client";
import { DailyStockPriceFactory } from "../prisma/factories/daily-stock-price.factory";
import { StockFactory } from "../prisma/factories/stock.factory";
import { DailyStockPriceModel } from "./daily-stock-price.model";

describe("DailyStockPriceModel", () => {
  describe("#findOrCreateLatestPrices", () => {
    describe("when the daily stock prices doesn't exist", () => {
      test("should fetch stock bars from Alpaca API and create a new daily stock price", async () => {
        const dailyStockPriceModel = new DailyStockPriceModel({ alpacaApi });
        const stock = await StockFactory.create({ symbol: "AAPL" });
        expect(await prisma.dailyStockPrice.count()).toEqual(0);
        const getMultiBarsSpy = vi.spyOn(alpacaApi, "getMultiBars");
        getMultiBarsSpy.mockResolvedValue({
          AAPL: [
            {
              Timestamp: "2022-12-14T05:00:00Z",
              OpenPrice: 145.35,
              HighPrice: 146.655,
              LowPrice: 141.16,
              ClosePrice: 143.21,
              Volume: 81781989,
              TradeCount: 590942,
              VWAP: 144.254407,
              Symbol: "AAPL",
            },
            {
              Timestamp: "2022-12-15T05:00:00Z",
              OpenPrice: 141.11,
              HighPrice: 141.8,
              LowPrice: 136.025,
              ClosePrice: 136.5,
              Volume: 99500030,
              TradeCount: 879348,
              VWAP: 137.645266,
              Symbol: "AAPL",
            },
            {
              Timestamp: "2022-12-16T05:00:00Z",
              OpenPrice: 136.685,
              HighPrice: 137.65,
              LowPrice: 133.73,
              ClosePrice: 134.51,
              Volume: 160026698,
              TradeCount: 819250,
              VWAP: 134.946521,
              Symbol: "AAPL",
            },
          ],
        });
        await dailyStockPriceModel.findOrCreateLatestPrices({
          stocks: [stock],
        });
        expect(await prisma.dailyStockPrice.count()).toEqual(1);
        expect(alpacaApi.getMultiBars).toHaveBeenCalledTimes(1);
      });
    });

    describe("when the daily stock prices exist", () => {
      test("should return daily stock prices without creating and fetching", async () => {
        const dailyStockPriceModel = new DailyStockPriceModel({ alpacaApi });
        const stock = await StockFactory.create({ symbol: "AAPL" });
        await DailyStockPriceFactory.create({ stockId: stock.id });
        expect(await prisma.dailyStockPrice.count()).toEqual(1);
        const getMultiBarsSpy = vi.spyOn(alpacaApi, "getMultiBars");
        await dailyStockPriceModel.findOrCreateLatestPrices({
          stocks: [stock],
        });
        expect(await prisma.dailyStockPrice.count()).toEqual(1);
        expect(getMultiBarsSpy).not.toHaveBeenCalled();
      });
    });
  });
});
