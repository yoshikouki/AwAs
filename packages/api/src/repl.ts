import repl, { REPLServer } from "node:repl";
import { FmpApi } from "./lib/fmp-api";
import { green, resetColor } from "./utils/logger";

const replServer: REPLServer = repl.start({
  prompt: `${green}api> ${resetColor}`,
});

replServer.context["FmpApi"] = FmpApi;
