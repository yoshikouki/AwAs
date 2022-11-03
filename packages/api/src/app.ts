import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import express from "express";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import cors from "cors";
import helmet from "helmet";
import nocache from "nocache";
import configs from "./configs";

const app = express();

app.use(morgan("combined"));
app.use(
  cors({
    origin: configs.client.url,
    methods: ["GET"],
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

app.use("/", indexRouter);
app.use("/users", usersRouter);

export default app;
