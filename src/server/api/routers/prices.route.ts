import { authedProcedure, createTRPCRouter } from "../trpc";

import { PricesService } from './../../services/prices.service';
import { getLatestPricesSchema } from "../../../schemas/prices.schema";

export const pricesRouter = createTRPCRouter({
  getLatestPrices: authedProcedure
    .input(getLatestPricesSchema)
    .query(async ({ input }) => {
      const pricesService = new PricesService();
      const prices = await pricesService.getLatestAllBySymbols(input.symbols);
      return prices;
    }),
});
