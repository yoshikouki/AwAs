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
  describe("#upsertAll", () => {
    describe("when the asset doesn't exist", () => {
      test("should create a new asset", async () => {
        const user = await UserFactory.create();
        const stock = await StockFactory.create();
        const balance = faker.datatype.number();
        const averageTradedPrice = faker.datatype.float({ min: 1 });
        expect(await prisma.holdingAsset.count()).toEqual(0);
        await holdingAssetModel.upsertAll({
          userId: user.id,
          assets: [{ stock, balance, averageTradedPrice }],
        });
        expect(await prisma.holdingAsset.count()).toEqual(1);
      });
    });

    describe("when the asset exists", () => {
      test("should update the asset", async () => {
        const user = await UserFactory.create();
        const stock = await StockFactory.create();
        const asset = await HoldingAssetFactory.create({ userId: user.id, stockId: stock.id });
        const balance = faker.datatype.number();
        const averageTradedPrice = faker.datatype.float({ min: 1 });
        expect(await prisma.holdingAsset.count()).toBe(1);
        await holdingAssetModel.upsertAll({
          userId: user.id,
          assets: [{ stock, balance, averageTradedPrice }],
        });
        expect(await prisma.holdingAsset.count()).toEqual(1);
        const updatedAsset = await prisma.holdingAsset.findUnique({ where: { id: asset.id } });
        expect(updatedAsset?.balance).toEqual(BigInt(balance));
        expect(updatedAsset?.averageTradedPrice).toEqual(averageTradedPrice);
      });
    });
  });
});
