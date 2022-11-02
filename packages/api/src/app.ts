import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import express from "express";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

const app = express();

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

export default app;
