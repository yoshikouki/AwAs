import repl, { REPLServer } from "node:repl";
import { alpacaApi } from "./lib/alpaca-api";
import { FmpApi } from "./lib/fmp-api";
import prisma from "./prisma/client";
import { green, resetColor } from "./utils/logger";

const replServer: REPLServer = repl.start({
  prompt: `${green}api> ${resetColor}`,
});

replServer.setupHistory(".node_repl_history", (err) => {
  if (err) {
    console.error(err);
    return;
  }
});

Object.entries({
  fmpApi: new FmpApi(),
  alpacaApi,
  prisma,
}).forEach(([k, v]) => (replServer.context[k] = v));
