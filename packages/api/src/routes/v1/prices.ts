import { Router } from "express";
import { body, validationResult } from "express-validator";
import JSONbig from "json-bigint";
import { validateAccessToken } from "../../middleware/auth0.middleware";
import { PricesService } from "../../services/prices.service";

const router = Router();

router.get(
  "/prices",
  validateAccessToken,
  body("symbols").isArray({ min: 1, max: 20 }).withMessage('"symbols" must be an array'),
  body("symbols.*").isString().isLength({ min: 1, max: 5 }).toUpperCase().trim().escape(),
  async (req, res, _) => {
    if (!req.auth?.payload.sub) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const pricesService = new PricesService();
    const assets = await pricesService.getAllBySymbols(req.body.symbols);
    res.status(200).send(JSONbig.stringify(assets));
  }
);

export default router;
