import { Router } from "express";
import { validateAccessToken } from "../middlewares/auth0.middleware";

const router = Router();

router.get("/users", validateAccessToken, (req, res, next) => {
  res.send("users has protected!");
});

export default router;
