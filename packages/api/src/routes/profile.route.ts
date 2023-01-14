import { authedProcedure, router } from "../lib/trpc";
import { ProfileService } from "../services/profile.service";

export const profileTrpcRouter = router({
  profile: authedProcedure.query(async ({ ctx }) => {
    const profileService = new ProfileService();
    const profile = await profileService.get({ uid: ctx.uid });
    return profile;
  }),
});
