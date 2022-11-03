import dotenv from "dotenv";

dotenv.config();

export default {
  port: parseInt(process.env.PORT || "8889", 10),
  client: {
    url: process.env.CLIENT_URL,
  },
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  audience: process.env.AUDIENCE,
};
