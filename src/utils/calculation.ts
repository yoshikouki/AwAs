import BigNumber from "bignumber.js";

export const sum = (integers: number[]): number => {
  return integers.reduce((acc, int) => add(acc, int));
};

export const add = (dirtyNumber: number, int: number): number => {
  return BigNumber(dirtyNumber).plus(int).toNumber();
};

export const sub = (dirtyNumber: number, int: number): number => {
  return BigNumber(dirtyNumber).minus(int).toNumber();
};

export const div = (dirtyNumber: number, int: number): number => {
  return BigNumber(dirtyNumber).div(int).toNumber();
};

export const mul = (dirtyNumber: number, int: number): number => {
  return BigNumber(dirtyNumber).multipliedBy(int).toNumber();
};
