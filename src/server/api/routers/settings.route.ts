import { authedProcedure, createTRPCRouter } from "../trpc";

import { SettingsService } from "../../services/settings.service";
import { z } from "zod";

export const settingsRouter = createTRPCRouter({
  settings: authedProcedure.query(async ({ ctx }) => {
    const settingsService = new SettingsService();
    const settings = await settingsService.getByUser({
      uid: ctx.session.user.id,
    });
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
        uid: ctx.session.user.id,
        name: input.name,
        email: input.email,
      });
      return profile;
    }),
});
