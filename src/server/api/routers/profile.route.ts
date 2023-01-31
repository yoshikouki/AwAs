import { ProfileService } from "../../services/profile.service";
import { authedProcedure, createTRPCRouter } from "../trpc";

export const profileTrpcRouter = createTRPCRouter({
  profile: authedProcedure.query(async ({ ctx }) => {
    const profileService = new ProfileService();
    const profile = await profileService.get({ uid: ctx.session.user.id });
    return profile;
  }),
});
