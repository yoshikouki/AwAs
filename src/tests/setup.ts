import { beforeEach } from "vitest";
import { cleanupDatabase } from "./helper";

beforeEach(async () => await cleanupDatabase());
