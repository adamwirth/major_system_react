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
