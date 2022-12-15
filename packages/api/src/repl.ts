import repl, { REPLServer } from "node:repl";
import { AlpacaApi } from "./lib/alpaca-api";
import { FmpApi } from "./lib/fmp-api";
import prisma from "./prisma/client";
import { green, resetColor } from "./utils/logger";

const replServer: REPLServer = repl.start({
  prompt: `${green}api> ${resetColor}`,
});

Object.entries({
  fmpApi: new FmpApi(),
  alpacaApi: new AlpacaApi(),
  prisma: prisma,
}).forEach(([k, v]) => (replServer.context[k] = v));
