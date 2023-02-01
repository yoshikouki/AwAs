import { prisma } from "../server/db";
import { resetDatabase } from "./helper";

export const setup = async () => {
  await resetDatabase();
};

export const teardown = async () => {
  await prisma.$disconnect();
};
