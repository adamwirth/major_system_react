import MajorSystemMappings from './Stores';
import { pickRandomArrayElement } from './Utils';
import type Dictionary from './Dictionary';

function Parser(dictionary: Dictionary): (input: string) => string {
  const BAD_VALUE_REPLACER = '_';

  const mapToMajorSystem = (int: number) => {
    const chosenMapping: string[] = MajorSystemMappings[int];
    return pickRandomArrayElement(chosenMapping);
  };

  const parseInteger = (int: number) => {
    const mappedChar = mapToMajorSystem(int);
    return dictionary.getWordFromChar(mappedChar);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const parseNonInteger = (char: string) => BAD_VALUE_REPLACER;

  /**
   * @desc Given a string, loop through, parsing out integers. Maps all inputs
   * to a random word mapping, or a space character on failure.
   * @param {string} input
   * @returns {string[]} an array, where each element in the array is either
   * a word mapped for the integer,
   * or a space the character was not an integer
   */
  const mapInput = (input: string): string[] => {
    const mappedInput: string[] = [];

    [...input].forEach((char) => {
      const charAsInt = Number.parseInt(char, 10);
      if (Number.isNaN(charAsInt)) mappedInput.push(parseNonInteger(char));
      else mappedInput.push(parseInteger(charAsInt));
    });

    return mappedInput;
  };

  const parseValue = (input: string): string => {
    const trimmedInput = input.trim();
    const suggestedWordsArray = mapInput(trimmedInput);
    return suggestedWordsArray.join('');
  };

  return parseValue;
}

export default Parser;
