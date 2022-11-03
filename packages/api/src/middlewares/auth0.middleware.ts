import { auth } from "express-oauth2-jwt-bearer";
import config from "../configs/index";

export const validateAccessToken = auth({
  issuerBaseURL: config.issuerBaseURL,
  audience: config.audience,
});
