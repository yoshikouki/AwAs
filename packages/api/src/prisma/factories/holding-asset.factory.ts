import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import prisma from "../client";
import { StockFactory } from "./stock.factory";
import { UserFactory } from "./user.factory";

type CreateInputType = Prisma.HoldingAssetUncheckedCreateInput;
const modelName = "holdingAsset";
const getDefaultAttributes = async () => ({
  userId: (await UserFactory.create()).id,
  stockId: (await StockFactory.create()).id,
  balance: faker.datatype.number(),
  averageTradedPrice: faker.datatype.float({ min: 1 }),
});

export const HoldingAssetFactory = {
  create: async (attrs?: Partial<CreateInputType>) => {
    return await prisma[modelName].create({
      data: {
        ...(await getDefaultAttributes()),
        ...attrs,
      },
    });
  },
};
