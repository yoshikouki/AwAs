import { authedProcedure, router } from "../lib/trpc";
import { AssetsService } from "../services/assets.service";

export const assetsTrpcRouter = router({
  assets: authedProcedure.query(async ({ ctx }) => {
    const assetsService = new AssetsService();
    const assets = await assetsService.getAllByUser({ uid: ctx.uid });
    return assets;
  }),
});
