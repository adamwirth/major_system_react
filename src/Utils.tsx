import { AssertionError } from 'chai';
/**
 * @param array - assertion: array.length > 0
 */
export function pickRandomArrayElement(array: string[]) {
  if (array.length === 1)
    return array[0];
  return array[Math.floor(Math.random() * array.length)];
}
export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new AssertionError(
      `Expected 'val' to be defined, but received ${val}`
    );
  }
}