import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import nocache from "nocache";
import path from "path";
import configs from "./configs";
import { validateAccessToken } from "./middleware/auth0.middleware";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { authedTrpcExpressMiddleware, publicTrpcExpressMiddleware } from "./middleware/trpc.middleware";
import rootRouter from "./routes/root";

const app = express();

app.use(morgan("combined"));
app.use(
  cors({
    origin: configs.client.url,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
    maxAge: 86400,
  })
);
app.use(helmet());
app.use(nocache());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/trpc/authed", validateAccessToken, authedTrpcExpressMiddleware);
app.use("/trpc", publicTrpcExpressMiddleware);
app.use("/", rootRouter);
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(configs.port, () => {
  console.log("Express server started on port: " + configs.port.toString());
});
