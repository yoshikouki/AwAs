import { z } from "zod";
import { authedProcedure, router } from "../lib/trpc";
import { SettingsService } from "../services/settings.service";

export const settingsTrpcRouter = router({
  settings: authedProcedure.query(async ({ ctx }) => {
    const settingsService = new SettingsService();
    const settings = await settingsService.getByUser({ uid: ctx.uid });
    return settings;
  }),

  updateProfile: authedProcedure
    .input(
      z.object({
        name: z.string().min(2).max(15).nullable(),
        email: z.string().email().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const settingsService = new SettingsService();
      const profile = await settingsService.updateOnUser({
        uid: ctx.uid,
        name: input.name,
        email: input.email,
      });
      return profile;
    }),
});
