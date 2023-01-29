import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import prisma from "../client";
import { StockFactory } from "./stock.factory";
import { UserFactory } from "./user.factory";

type CreateInputType = Prisma.HoldingAssetUncheckedCreateInput;
const modelName = "holdingAsset";
const getAttributes = async (attrs?: Partial<CreateInputType>) => ({
  userId: attrs?.userId || (await UserFactory.create()).id,
  stockId: attrs?.stockId || (await StockFactory.create()).id,
  balance: attrs?.balance || faker.datatype.number(),
  averageTradedPrice: attrs?.averageTradedPrice || faker.datatype.float({ min: 1 }),
});

export const HoldingAssetFactory = {
  create: async (attrs?: Partial<CreateInputType>) => {
    return await prisma[modelName].create({
      data: await getAttributes(attrs),
    });
  },
};
