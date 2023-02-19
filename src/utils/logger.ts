export const resetColor = "\x1b[39m";
export const blue = "\x1b[34m";
export const yellow = "\x1b[33m";
export const red = "\x1b[31m";
export const green = "\x1b[32m";

export const logger = {
  log: (message: string, ...optionalParams: unknown[]) =>
    console.log(resetColor + message, optionalParams),
  info: (message: string, ...optionalParams: unknown[]) =>
    console.info(blue + message + resetColor, optionalParams),
  warn: (message: string, ...optionalParams: unknown[]) =>
    console.warn(yellow + message + resetColor, optionalParams),
  error: (message: string, ...optionalParams: unknown[]) =>
    console.error(red + message + resetColor, optionalParams),
  sql: (message: string, ...optionalParams: unknown[]) =>
    console.log(green + message + resetColor, optionalParams),
};
