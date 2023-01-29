import { z } from "zod";
import { authedProcedure, router } from "../lib/trpc";
import { ProfileService } from "../services/profile.service";
import { SettingsService } from "../services/settings.service";

export const settingsTrpcRouter = router({
  settings: authedProcedure.query(async ({ ctx }) => {
    const settingsService = new SettingsService();
    const settings = await settingsService.getByUser({ uid: ctx.uid });
  return settings;
  }),
});
