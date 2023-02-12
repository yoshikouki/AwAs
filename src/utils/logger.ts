export const resetColor = "\x1b[39m";
export const blue = "\x1b[34m";
export const yellow = "\x1b[33m";
export const red = "\x1b[31m";
export const green = "\x1b[32m";

export const logger = {
  log: (message: string) => console.log(resetColor + message),
  info: (message: string) => console.info(blue + message + resetColor),
  warn: (message: string) => console.warn(yellow + message + resetColor),
  error: (message: string) => console.error(red + message + resetColor),
  sql: (message: string) => console.log(green + message + resetColor),
};
