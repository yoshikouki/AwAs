import { Router } from "express";
import { validateAccessToken } from "../../middleware/auth0.middleware";
import { ProfileService } from "../../services/profile.service";

const router = Router();

router.get("/profile", validateAccessToken, async (req, res, _) => {
  const uid = req.auth?.payload.sub;
  if (!uid) return res.status(401).json({ message: "Unauthorized" });

  const profileService = new ProfileService();
  const profile = await profileService.get({ uid });
  if (profile) {
    res.status(200).json(profile);
  } else {
    res.status(400).json({ message: "Bad Request" });
  }
});

export default router;
