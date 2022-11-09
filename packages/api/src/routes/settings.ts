import { Router } from "express";
import { body, validationResult } from "express-validator";
import { validateAccessToken } from "../middleware/auth0.middleware";
import { SettingsService } from "../services/settings.service";

const router = Router();

router.get("/settings", validateAccessToken, async (req, res, _) => {
  const uid = req.auth?.payload.sub;
  if (!uid) return res.status(401).json({ message: "Unauthorized" });

  const settingsService = new SettingsService();
  const settings = await settingsService.getByUser({ uid });
  res.status(200).json(settings);
});

router.patch(
  "/settings/profile",
  validateAccessToken,
  body("email").isEmail().normalizeEmail(),
  body("name").isLength({ min: 2, max: 15 }).trim().escape(),
  async (req, res, _) => {
    const uid = req.auth?.payload.sub;
    if (!uid) return res.status(401).json({ message: "Unauthorized" });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const settingsService = new SettingsService();
    const { profile, error } = await settingsService.updateOnUser({
      uid,
      name: req.body.name,
      email: req.body.email,
    });
    if (error) {
      res.status(400).json({ message: "Bad Request", error });
    } else {
      res.status(200).json(profile);
    }
  }
);

export default router;
