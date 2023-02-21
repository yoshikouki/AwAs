import BigNumber from "bignumber.js";

export const add = (
  dirtyNumber: number | undefined,
  int: number | undefined
): number => {
  if (dirtyNumber == undefined || int == undefined) {
    return 0;
  }
  return BigNumber(dirtyNumber).plus(int).toNumber();
};

export const sub = (
  dirtyNumber: number | undefined,
  int: number | undefined
): number => {
  if (dirtyNumber == undefined || int == undefined) {
    return 0;
  }
  return BigNumber(dirtyNumber).minus(int).toNumber();
};

export const div = (
  numerator: number | undefined,
  denominator: number | undefined
): number => {
  if (numerator == undefined || denominator == undefined || denominator === 0) {
    return 0;
  }
  return BigNumber(numerator).div(denominator).toNumber();
};

export const mul = (
  dirtyNumber: number | undefined,
  int: number | undefined
): number => {
  if (dirtyNumber == undefined || int == undefined) {
    return 0;
  }
  return BigNumber(dirtyNumber).multipliedBy(int).toNumber();
};

export const sum = (integers: number[]): number => {
  return integers.reduce((acc, int) => add(acc, int));
};

export const percent = (
  numerator: number | undefined,
  denominator: number | undefined
): number => {
  if (numerator == undefined || denominator == undefined || denominator === 0) {
    return 0;
  }
  return BigNumber(numerator).div(denominator).multipliedBy(100).toNumber();
};
