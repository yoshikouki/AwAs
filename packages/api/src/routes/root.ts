import { Router } from "express";
import assetsRouter from "./assets";
import indexRouter from "./index";

const rootRouter = Router();

rootRouter.use("/", indexRouter, assetsRouter);

export default rootRouter;
