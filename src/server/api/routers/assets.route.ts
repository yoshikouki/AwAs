import { authedProcedure, createTRPCRouter } from "../trpc";

import { AssetsService } from "../../services/assets.service";
import { upsertAssetsSchema } from "../../../schemas/assets";

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
