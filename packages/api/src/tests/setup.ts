import console from "console";
import prisma from "../prisma/client";
import { cleanupDatabase, resetDatabase } from "./helper";

beforeAll(async () => await resetDatabase());
beforeEach(async () => await cleanupDatabase());
afterAll(async () => await prisma.$disconnect());

global.console = console;
