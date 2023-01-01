import child_process from "child_process";
import util from "util";
import prisma from "../prisma/client";
import { logger } from "../utils/logger";

const exec = util.promisify(child_process.exec);

export const cleanupDatabase = async (): Promise<void> => {
  const tableNames = await prisma.$queryRaw<
    Array<{ TABLE_NAME: string }>
  >`SELECT table_name FROM information_schema.tables WHERE table_schema = 'awas_test' AND table_name != '_prisma_migrations'`;
  const tables = tableNames
    .map(({ TABLE_NAME }) => TABLE_NAME)
    .join(", ");

  try {
    await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0;`);
    await prisma.$executeRawUnsafe(`DROP TABLE ${tables};`);
    await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1;`);
    await exec("npx prisma db push");
  } catch (error) {
    console.log({ error });
  }
};

export const resetDatabase = async (): Promise<void> => {
  await exec("npx prisma migrate reset --force");
};

export const putQueryLogs = () => {
  prisma.$on("query", (e) => {
    logger.log(`prisma:query [${e.duration}ms] params: ${e.params}`);
    logger.sql(`\t${e.query}`);
  });
}
export const putTestNames = (ctx) => {
  logger.info(`\n[TEST] ${ctx.expect.getState().currentTestName}\n`);
};
