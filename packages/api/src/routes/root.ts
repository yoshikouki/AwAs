import { Router } from "express";
import healthRouter from "./health";
import assetsRouter from "./v1/assets";
import profileRouter from "./v1/profile";
import settingsRouter from "./v1/settings";

const rootRouter = Router();

rootRouter.use("/v1", assetsRouter, settingsRouter, profileRouter);
rootRouter.use("/", healthRouter);

export default rootRouter;
