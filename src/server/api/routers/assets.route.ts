import { authedProcedure, createTRPCRouter } from "../trpc";

import { AssetsService } from "../../services/assets.service";

export const assetsRouter = createTRPCRouter({
  assets: authedProcedure.query(async ({ ctx }) => {
    const assetsService = new AssetsService();
    const assets = await assetsService.getAllByUser({ uid: ctx.session.user.id });
    return assets;
  }),
});
