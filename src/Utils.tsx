import { isError } from 'lodash';

/**
 * @param array - assertion: array.length > 0
 */
export function pickRandomArrayElement<T>(array: T[]): T {
  if (array.length === 1) return array[0];
  return array[Math.floor(Math.random() * array.length)];
}

export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`);
  }
}

// attempted wrapper extrapolation; pretty tricky
// export type FunctionWrapper = <T extends (...args: any[]) => any>(
//   func: T,
// ) => (...funcArgs: Parameters<T>) => ReturnType<T>;

/**
 * @ref https://github.com/lodash/lodash/blob/4.17.15/lodash.js#L15252
 * @ref https://reactjs.org/docs/error-boundaries.html#how-about-trycatch+
 * @ref https://spin.atomicobject.com/2019/01/11/typescript-higher-order-functions/
 * @param func - function to wrap
 * @todo might be able to eliminate one of the two error return values ive expressed in TS, somehow
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function imperativeErrorWrapper<T extends (...args: any[]) => any>(
  func: T,
): ((...funcArgs: Parameters<T>) => ReturnType<T> | Error) | Error {
  try {
    return (...args: Parameters<T>): ReturnType<T> => func(args);
  } catch (e) {
    return isError(e) ? e : new Error(e);
  }
}
