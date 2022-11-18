import { describe, expect, test } from "vitest";
import prisma from "../prisma/client";
import { StockFactory } from "../prisma/factories/stock.factory";
import { StockModel } from "./stock.model";

const stockModel = new StockModel();

describe("StockModel", () => {
  describe("#findOrCreateMany", () => {
    test("should create new stock when the stock doesn't exist", async () => {
      expect(await prisma.stock.count()).toBe(0);
      const stocks = await stockModel.findOrCreateMany({
        symbols: ["APPL"],
      });
      expect(stocks).toHaveLength(1);
      expect(await prisma.stock.count()).toBe(1);
    });

    test("should return existed stock", async () => {
      const stock = await StockFactory.create();
      expect(await prisma.stock.count()).toBe(1);
      const stocks = await stockModel.findOrCreateMany({
        symbols: [stock.symbol],
      });
      expect(stocks).toHaveLength(1);
      expect(await prisma.stock.count()).toBe(1);
    });
  });
});
