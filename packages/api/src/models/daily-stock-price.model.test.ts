import { describe, expect, test } from "vitest";
import { FmpApi } from "../lib/fmp-api";
import prisma from "../prisma/client";
import { DailyStockPriceFactory } from "../prisma/factories/daily-stock-price.factory";
import { StockFactory } from "../prisma/factories/stock.factory";
import { DailyStockPriceModel } from "./daily-stock-price.model";

// const fmpApi = new FmpApi({ apiKey: "testApiKey" });
const fmpApi = new FmpApi();
const dailyStockPriceModel = new DailyStockPriceModel({ fmpApi });

describe("DailyStockPriceModel", () => {
  describe("#findOrCreateAll", () => {
    describe("when the daily stock prices doesn't exist", () => {
      test("should create a new daily stock price", async () => {
        const stock = await StockFactory.create({ symbol: "AAPL" });
        expect(await prisma.dailyStockPrice.count()).toEqual(0);
        await dailyStockPriceModel.findOrCreateAll({
          stocks: [stock],
        });
        expect(await prisma.dailyStockPrice.count()).toEqual(1);
      });
    });

    describe("when the daily stock prices exist", () => {
      test("should return daily stock prices without creating and fetching", async () => {
        const stock = await StockFactory.create({ symbol: "AAPL" });
        await DailyStockPriceFactory.create({ stockId: stock.id })
        expect(await prisma.dailyStockPrice.count()).toEqual(1);
        await dailyStockPriceModel.findOrCreateAll({
          stocks: [stock],
        });
        expect(await prisma.dailyStockPrice.count()).toEqual(1);
      });
    });
  });
});
