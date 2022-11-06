import { Router } from "express";
import { validateAccessToken } from "../middleware/auth0.middleware";
import { AssetsService } from "../services/assets.service";

const router = Router();

router.get("/assets", validateAccessToken, (req, res, _) => {
  const uid = req.auth?.payload.sub;
  if (!uid) return res.status(401).json({ message: "Unauthorized" });

  const assetsService = new AssetsService();
  const assets = assetsService.getAllAssetsByUser({ uid });
  res.status(200).json(assets);
});

export default router;
