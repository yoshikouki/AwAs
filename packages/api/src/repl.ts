import repl, { REPLServer } from "node:repl";
import { FmpApi } from "./lib/fmp-api";
import prisma from "./prisma/client";
import { green, resetColor } from "./utils/logger";

const replServer: REPLServer = repl.start({
  prompt: `${green}api> ${resetColor}`,
});

Object.entries({
  fmpApi: new FmpApi(),
  prisma: prisma,
}).forEach(([k, v]) => (replServer.context[k] = v));
