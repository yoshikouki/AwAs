import { Router } from "express";

const router = Router();

router.get("/health", (_req, res, _next) => {
  res.json({ message: "OK" });
});

export default router;
