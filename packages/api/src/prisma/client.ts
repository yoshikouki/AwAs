import { Prisma, PrismaClient } from "@prisma/client";
import { logger } from "../utils/logger";

const prisma = new PrismaClient({
  log: [
    {
      level: "query",
      emit: "event",
    },
    {
      level: "info",
      emit: "event",
    },
    {
      level: "warn",
      emit: "stdout",
    },
    {
      level: "error",
      emit: "stdout",
    },
  ],
});

prisma.$on("query", (e: Prisma.QueryEvent) => {
  if ((process.env.NODE_ENV === "development")) {
  // if ((process.env.NODE_ENV !== "production")) {
    logger.log(`[${e.timestamp}] prisma:query [${e.duration}ms] params: ${e.params}`);
    logger.sql(e.query);
  }
});

export default prisma
