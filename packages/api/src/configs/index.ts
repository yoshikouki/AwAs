import dotenv from "dotenv";

dotenv.config();

if (
  !(
    process.env.CLIENT_URL &&
    process.env.AUTH0_ISSUER_BASE_URL &&
    process.env.AUTH0_AUDIENCE &&
    process.env.FMP_API_KEY &&
    process.env.ALPACA_API_KEY &&
    process.env.ALPACA_SECRET_KEY
  )
) {
  throw new Error("Missing required environment variables.");
}

export default {
  port: parseInt(process.env.PORT || "8889", 10),
  client: {
    url: process.env.CLIENT_URL,
  },
  auth0: {
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    audience: process.env.AUTH0_AUDIENCE,
  },
  fmp: {
    apiKey: process.env.FMP_API_KEY,
  },
  alpaca: {
    apiKey: process.env.ALPACA_API_KEY,
    SecretKey: process.env.ALPACA_SECRET_KEY,
  },
};
