import { authedProcedure, publicProcedure, router } from "../lib/trpc";
import { ProfileService } from "../services/profile.service";

export const publicTrpcRouter = router({
  health: publicProcedure.query((_req) => "ok"),
});;
export const authedTrpcRouter = router({
  profile: authedProcedure.query(async ({ ctx }) => {
    const profileService = new ProfileService();
    const profile = await profileService.get({ uid: ctx.uid });
    return profile;
  })
});


export type PublicTRPCRouter = typeof publicTrpcRouter;
export type AuthedTRPCRouter = typeof authedTrpcRouter;
