import prisma from "./client";
import { cleanupDatabase, resetDatabase } from "./test-helper";

beforeAll(async () => await resetDatabase());
beforeEach(async () => await cleanupDatabase());
afterAll(async () => await prisma.$disconnect());
