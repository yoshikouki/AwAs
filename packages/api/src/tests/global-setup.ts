import prisma from "../prisma/client";
import { resetDatabase } from "./helper";

export const setup = async () => {
  await resetDatabase();
};

export const teardown = async () => {
  await prisma.$disconnect();
};
