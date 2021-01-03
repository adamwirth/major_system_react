import { MajorSystemMappings } from './Stores';
import { pickRandomArrayElement } from './Utils';
import type Dictionary from './Dictionary';

function Parser(dictionary: Dictionary) {
  const BAD_VALUE = '';
  const BAD_VALUE_REPLACER = '_';
  /**
   * @desc Given a string, loop through, parsing out integers. Maps all inputs
   * to a random word mapping, or a space character on failure.
   * @param {string} input
   * @returns {string[]} an array, where each element in the array is either a word mapped for the integer, or a space the character was not an integer
   */
  const mapNumbers = (input: string) => {
    return [...input].map((value) => {
      const intValue = parseInt(value);
      if (isNaN(intValue)) return BAD_VALUE;
      const chosenMapping: string[] = MajorSystemMappings[intValue];
      return pickRandomArrayElement(chosenMapping);
    });
  };

  const mapCharacters = (mappedInput: string[]) => {
    // todo rewrite to be "getWordFromNumber" and loop in here
    const mappedIntegers = dictionary.getWordsFromNumbers(mappedInput);
    const mapNonIntegers = (array: string[]) =>
      array.map((v: string) => (v === BAD_VALUE ? BAD_VALUE_REPLACER : v));
    console.debug(mappedIntegers);
    return mapNonIntegers(mappedIntegers);
  };

  const parseValue = (input: string) => {
    console.debug('parseValue entered', input);
    const characters = mapNumbers(input);
    const suggestedWords = mapCharacters(characters);
    console.debug('parseValue leaving', input, characters, suggestedWords);
    return suggestedWords;
  };

  return parseValue;
}

export default Parser;
