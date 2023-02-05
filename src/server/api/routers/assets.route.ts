import { authedProcedure, createTRPCRouter } from "../trpc";

import { AssetsService } from "../../services/assets.service";
import { z } from "zod";

export const upsertAssetsSchema = z.array(
  z.object({
    symbol: z.string().min(1).max(5),
    balance: z.number().nonnegative(),
    averageTradedPrice: z.number().nonnegative().nullable(),
  })
);

export const assetsRouter = createTRPCRouter({
  assets: authedProcedure.query(async ({ ctx }) => {
    const assetsService = new AssetsService();
    const assets = await assetsService.getAllByUser({
      uid: ctx.session.user.id,
    });
    return assets;
  }),

  upsertAssets: authedProcedure
    .input(upsertAssetsSchema)
    .mutation(async ({ ctx, input }) => {
      const assetsService = new AssetsService();
      const { result } = await assetsService.updateAllByUser({
        uid: ctx.session.user.id,
        assets: input,
      });

      return result;
    }),
});
