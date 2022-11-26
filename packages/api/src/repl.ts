import repl, { REPLServer } from "node:repl";
import { green, resetColor } from "./utils/logger";

const replServer: REPLServer = repl.start({
  prompt: `${green}api> ${resetColor}`,
});
