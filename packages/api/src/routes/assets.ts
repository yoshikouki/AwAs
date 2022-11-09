import { Router } from "express";
import { body } from "express-validator";
import { validateAccessToken } from "../middleware/auth0.middleware";
import { AssetsService } from "../services/assets.service";

const router = Router();

router.get("/assets", validateAccessToken, async (req, res, _) => {
  const uid = req.auth?.payload.sub;
  if (!uid) return res.status(401).json({ message: "Unauthorized" });

  const assetsService = new AssetsService();
  const assets = await assetsService.getAllByUser({ uid });
  res.status(200).json(assets);
});

router.patch(
  "/assets",
  validateAccessToken,
  body("assets.*.symbol").not().isEmpty().isAlpha().isLength({ min: 1, max: 5 }).trim(),
  body("assets.*.balance").not().isEmpty().isInt({ min: 0 }),
  body("assets.*.averageTradedPrice").isInt({ min: 0 }),
  async (req, res, _) => {
    const uid = req.auth?.payload.sub;
    if (!uid) return res.status(401).json({ message: "Unauthorized" });

    const assetsService = new AssetsService();
    const { result, errors } = await assetsService.updateAllByUser({
      uid,
      assets: req.body.assets,
    });
    if (result && !errors) {
      res.status(200).json({ message: "OK" });
    } else {
      res.status(400).json({ message: "Bad Request", errors });
    }
  }
);

export default router;
