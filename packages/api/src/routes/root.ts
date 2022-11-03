import { Router } from "express";
import indexRouter from "./index";
import usersRouter from "./users";

const rootRouter = Router();

rootRouter.use("/", indexRouter, usersRouter);

export default rootRouter;
