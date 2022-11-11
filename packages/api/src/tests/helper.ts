import child_process from "child_process";
import util from "util";
import prisma from "../prisma/client";


const exec = util.promisify(child_process.exec);

export const cleanupDatabase = async (): Promise<void> => {
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;
  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== "_prisma_migrations")
    .map((name) => `"public"."${name}"`)
    .join(", ");

  try {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
  } catch (error) {
    console.log({ error });
  }
};

export const resetDatabase = async (): Promise<void> => {
  await exec("npx prisma migrate reset --force");
};
