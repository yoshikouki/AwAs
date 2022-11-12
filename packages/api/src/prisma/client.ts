import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  if ((process.env.NODE_ENV === "development" && params.model)) {
  // if ((process.env.NODE_ENV !== "production" && params.model)) {
    console.log(
      `${params.model} #${params.action} - ${after - before}ms`
    );
  }
  return result;
});

export default prisma
