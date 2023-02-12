import { faker } from "@faker-js/faker";
import type { Prisma } from "@prisma/client";
import { prisma } from "../../server/db";

type CreateInputType = Prisma.StockCreateInput;
const modelName = "stock";
const getDefaultAttributes = async () => ({
  symbol: faker.random.alpha({ count: 5, casing: "upper" }),
  createdAt: faker.date.past(),
});

export const StockFactory = {
  create: async (attrs?: Partial<CreateInputType>) => {
    return await prisma[modelName].create({
      data: {
        ...(await getDefaultAttributes()),
        ...attrs,
      },
    });
  },
};
