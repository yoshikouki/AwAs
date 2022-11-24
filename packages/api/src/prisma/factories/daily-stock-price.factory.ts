import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import prisma from "../client";
import { StockFactory } from "./stock.factory";

type CreateInputType = Prisma.DailyStockPriceUncheckedCreateInput;
const modelName = "dailyStockPrice";
const getDefaultAttributes = async (attrs?: Partial<CreateInputType>) => ({
  stockId: attrs?.stockId || (await StockFactory.create()).id,
  date: attrs?.date || faker.date.past(),
  open: attrs?.open || faker.datatype.float({ min: 1 }),
  close: attrs?.close || faker.datatype.float({ min: 1 }),
  high: attrs?.high || faker.datatype.float({ min: 1 }),
  low: attrs?.low || faker.datatype.float({ min: 1 }),
  adjClose: attrs?.adjClose || faker.datatype.float({ min: 1 }),
  volume: attrs?.volume || faker.datatype.number(),
  unadjustedVolume: attrs?.unadjustedVolume || faker.datatype.number(),
  change: attrs?.change || faker.datatype.float(),
  changePercent: attrs?.changePercent || faker.datatype.float(),
  vwap: attrs?.vwap || faker.datatype.float({ min: 1 }),
  changeOverTime: attrs?.changeOverTime || faker.datatype.float(),
  createdAt: attrs?.createdAt || faker.date.past(),
});

export const DailyStockPriceFactory = {
  create: async (attrs?: Partial<CreateInputType>) => {
    return await prisma[modelName].create({
      data: await getDefaultAttributes(attrs),
    });
  },
};
