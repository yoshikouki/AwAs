import dotenv from "dotenv";

dotenv.config();

export default {
  port: parseInt(process.env.PORT || "8889", 10),
};
