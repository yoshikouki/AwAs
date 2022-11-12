export const nonNullable = <T>(value: T): value is NonNullable<T> => value != null;
export const filterNonNullable = <T>(array: T[]) => array.filter(nonNullable<T>)
