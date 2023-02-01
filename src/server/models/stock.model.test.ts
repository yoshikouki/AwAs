import { describe, expect, test } from "vitest";

import { DailyStockPriceFactory } from "../../prisma/factories/daily-stock-price.factory";
import { StockFactory } from "../../prisma/factories/stock.factory";
import { StockModel } from "./stock.model";
import { prisma } from "../db";

const stockModel = new StockModel();

describe("StockModel", () => {
  describe("#findOrCreateAll", () => {
    test("should create new stock when the stock doesn't exist", async () => {
      expect(await prisma.stock.count()).toBe(0);
      const stocks = await stockModel.findOrCreateAll({
        symbols: ["APPL"],
      });
      expect(stocks).toHaveLength(1);
      expect(await prisma.stock.count()).toBe(1);
    });

    test("should return existed stock", async () => {
      const stock = await StockFactory.create();
      expect(await prisma.stock.count()).toBe(1);
      const stocks = await stockModel.findOrCreateAll({
        symbols: [stock.symbol],
      });
      expect(stocks).toHaveLength(1);
      expect(await prisma.stock.count()).toBe(1);
    });
  });

  describe("#findAllBySymbolsWithLatestDailyPrice", () => {
    test("should return existed stock with latest daily close price", async () => {
      const stock = await StockFactory.create();
      const latestDailyStockPrice = await DailyStockPriceFactory.create({
        stockId: stock.id,
        date: new Date("2022-01-02"),
      });
      await DailyStockPriceFactory.create({
        stockId: stock.id,
        date: new Date("2022-01-01"),
      });
      const stocks = await stockModel.findAllBySymbolsWithLatestDailyPrice([
        stock.symbol,
      ]);
      expect(stocks).toHaveLength(1);
      expect(stocks[0].symbol).toEqual(stock.symbol);
      expect(stocks[0].dailyStockPrices).toHaveLength(1);
      expect(stocks[0].dailyStockPrices[0].date).toEqual(
        latestDailyStockPrice.date
      );
      expect(stocks[0].dailyStockPrices[0].close).toEqual(
        latestDailyStockPrice.close
      );
    });
  });
});
