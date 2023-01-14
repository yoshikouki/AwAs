import { Router } from "express";
import healthRouter from "./health.route";
import assetsRouter from "./v1/assets";
import pricesRouter from "./v1/prices";
import settingsRouter from "./v1/settings";

const rootRouter = Router();

rootRouter.use("/v1", assetsRouter, settingsRouter, pricesRouter);
rootRouter.use("/", healthRouter);

export default rootRouter;
