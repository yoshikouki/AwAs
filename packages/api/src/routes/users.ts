import express from "express";
import { validateAccessToken } from "../middlewares/auth0.middleware";

const router = express.Router();

router.get("/", validateAccessToken, (req, res, next) => {
  res.send("users has protected!");
});

export default router;
