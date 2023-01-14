import { Router } from "express";
import { publicProcedure, router } from "../lib/trpc";

const healthRouter = Router();

healthRouter.get("/health", (_req, res, _next) => {
  res.json({ message: "OK" });
});

export default healthRouter;

export const healthTrpcRouter = router({
  health: publicProcedure.query((_req) => "ok"),
});
