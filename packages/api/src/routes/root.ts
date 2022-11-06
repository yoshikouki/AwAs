import { Router } from "express";
import assetsRouter from "./assets";
import healthRouter from "./health";

const rootRouter = Router();

rootRouter.use("/v1", assetsRouter);
rootRouter.use("/", healthRouter);

export default rootRouter;
