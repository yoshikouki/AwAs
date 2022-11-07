import { Router } from "express";
import { validateAccessToken } from "../middleware/auth0.middleware";
import { SettingsService } from "../services/settings.service";

const router = Router();

router.get("/settings", validateAccessToken, (req, res, _) => {
  const uid = req.auth?.payload.sub;
  if (!uid) return res.status(401).json({ message: "Unauthorized" });

  const settingsService = new SettingsService();
  const settings = settingsService.getByUser({ uid });
  res.status(200).json(settings);
});

router.patch("/profile", validateAccessToken, (req, res, _) => {
  const uid = req.auth?.payload.sub;
  if (!uid) return res.status(401).json({ message: "Unauthorized" });

  const settingsService = new SettingsService();
  const errors = settingsService.updateOnUser({ uid });
  if (errors) {
    res.status(400).json({ message: "Bad Request", errors });
  } else {
    res.status(200).json({ message: "OK" });
  }
})

export default router;