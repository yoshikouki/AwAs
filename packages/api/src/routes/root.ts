import { Router } from "express";
import assetsRouter from "./assets";
import healthRouter from "./health";
import settingsRouter from "./settings";

const rootRouter = Router();

rootRouter.use("/v1", assetsRouter, settingsRouter);
rootRouter.use("/", healthRouter);

export default rootRouter;
