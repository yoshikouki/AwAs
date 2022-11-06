import { Router } from "express";
import assetsRouter from "./assets";
import indexRouter from "./index";

const rootRouter = Router();

rootRouter.use("/v1", indexRouter, assetsRouter);

export default rootRouter;
