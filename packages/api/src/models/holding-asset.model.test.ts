import { faker } from "@faker-js/faker";
import prisma from "../prisma/client";
import { HoldingAssetFactory } from "../prisma/factories/holding-asset.factory";
import { StockFactory } from "../prisma/factories/stock.factory";
import { UserFactory } from "../prisma/factories/user.factory";
import { putLogs } from "../tests/helper";
import { HoldingAssetModel } from "./holding-asset.model";

const holdingAssetModel = new HoldingAssetModel();
putLogs();

describe("HoldingAssetModel", () => {
  describe("#deleteAndCreateAll", () => {
    describe("when the asset doesn't exist", () => {
      test("should create a new asset", async () => {
        const user = await UserFactory.create();
        const stock = await StockFactory.create();
        const balance = faker.datatype.number();
        const averageTradedPrice = faker.datatype.float({ min: 1 });
        expect(await prisma.holdingAsset.count()).toEqual(0);
        await holdingAssetModel.deleteAndCreateAll({
          userId: user.id,
          assets: [{ stock, balance, averageTradedPrice }],
        });
        expect(await prisma.holdingAsset.count()).toEqual(1);
      });

      test("should create new assets", async () => {
        const user = await UserFactory.create();
        const stock = await StockFactory.create();
        const balance = faker.datatype.number();
        const averageTradedPrice = faker.datatype.float({ min: 1 });
        const stock2 = await StockFactory.create();
        const balance2 = faker.datatype.number();
        const averageTradedPrice2 = faker.datatype.float({ min: 1 });
        expect(await prisma.holdingAsset.count()).toEqual(0);
        await holdingAssetModel.deleteAndCreateAll({
          userId: user.id,
          assets: [
            { stock, balance, averageTradedPrice },
            { stock: stock2, balance: balance2, averageTradedPrice: averageTradedPrice2 },
          ],
        });
        expect(await prisma.holdingAsset.count()).toEqual(2);
      });
    });

    describe("when the asset in attribute asset exists", () => {
      test("should delete and create the asset to be updated", async () => {
        const user = await UserFactory.create();
        const stock = await StockFactory.create();
        await HoldingAssetFactory.create({ userId: user.id, stockId: stock.id });
        const balance = faker.datatype.number();
        const averageTradedPrice = faker.datatype.float({ min: 1 });
        expect(await prisma.holdingAsset.count()).toBe(1);
        await holdingAssetModel.deleteAndCreateAll({
          userId: user.id,
          assets: [{ stock, balance, averageTradedPrice }],
        });
        expect(await prisma.holdingAsset.count()).toEqual(1);
        const updatedAsset = await prisma.holdingAsset.findUnique({
          where: {
            userId_stockId: { userId: user.id, stockId: stock.id },
          },
        });
        expect(updatedAsset?.balance).toEqual(BigInt(balance));
        expect(updatedAsset?.averageTradedPrice).toEqual(averageTradedPrice);
      });

      test("should update assets", async () => {
        const user = await UserFactory.create();
        const stock = await StockFactory.create();
        await HoldingAssetFactory.create({ userId: user.id, stockId: stock.id });
        const balance = faker.datatype.number();
        const averageTradedPrice = faker.datatype.float({ min: 1 });
        const stock2 = await StockFactory.create();
        await HoldingAssetFactory.create({ userId: user.id, stockId: stock2.id });
        const balance2 = faker.datatype.number();
        const averageTradedPrice2 = faker.datatype.float({ min: 1 });
        expect(await prisma.holdingAsset.count()).toBe(2);
        await holdingAssetModel.deleteAndCreateAll({
          userId: user.id,
          assets: [
            { stock, balance, averageTradedPrice },
            { stock: stock2, balance: balance2, averageTradedPrice: averageTradedPrice2 },
          ],
        });
        const [updatedAsset, updatedAsset2] = await prisma.holdingAsset.findMany({
          where: { user },
        });
        expect(await prisma.holdingAsset.count()).toEqual(2);
        expect(updatedAsset?.balance).toEqual(BigInt(balance));
        expect(updatedAsset?.averageTradedPrice).toEqual(averageTradedPrice);
        expect(updatedAsset2?.balance).toEqual(BigInt(balance2));
        expect(updatedAsset2?.averageTradedPrice).toEqual(averageTradedPrice2);
      });
    });

    describe("when attribute doesn't have existed asset", () => {
      test("should delete the asset", async () => {
        const user = await UserFactory.create();
        const stock = await StockFactory.create();
        const asset = await HoldingAssetFactory.create({ userId: user.id, stockId: stock.id });
        expect(await prisma.holdingAsset.count()).toBe(1);
        await holdingAssetModel.deleteAndCreateAll({
          userId: user.id,
          assets: [],
        });
        expect(await prisma.holdingAsset.count()).toEqual(0);
        const updatedAsset = await prisma.holdingAsset.findUnique({ where: { id: asset.id } });
        expect(updatedAsset).toBeNull();
      });

      test("should delete assets", async () => {
        const user = await UserFactory.create();
        const stock = await StockFactory.create();
        await HoldingAssetFactory.create({ userId: user.id, stockId: stock.id });
        const stock2 = await StockFactory.create();
        await HoldingAssetFactory.create({ userId: user.id, stockId: stock2.id });
        expect(await prisma.holdingAsset.count()).toBe(2);
        await holdingAssetModel.deleteAndCreateAll({
          userId: user.id,
          assets: [],
        });
        const assets = await prisma.holdingAsset.findMany({
          where: { user },
        });
        expect(assets.length).toEqual(0);
      });
    });
  });
});
