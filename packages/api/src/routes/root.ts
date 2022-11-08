import { Router } from "express";
import assetsRouter from "./assets";
import healthRouter from "./health";
import profileRouter from "./profile";
import settingsRouter from "./settings";

const rootRouter = Router();

rootRouter.use("/v1", assetsRouter, settingsRouter, profileRouter);
rootRouter.use("/", healthRouter);

export default rootRouter;
