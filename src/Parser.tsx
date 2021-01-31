import MajorSystemMappings, { MAX_USER_INPUT_LENGTH } from './Stores';
import { pickRandomArrayElement } from './Utils';
import type Dictionary from './Dictionary';
import type { IOptionsAndUserInput } from './Dictionary';

function Parser(
  dictionary: Dictionary,
): (args: IOptionsAndUserInput) => string {
  const BAD_VALUE_REPLACER = '_';

  /**
   * @summary Returns false if an array has all unique values, otherwise true
   * @desc With this setup right now, it's all luck based.
   *
   * Testing shows the number of individual word checks by a words[] N
   * grows exponentially, getting out of hand around 17 words.
   *
   * @todo This needs to be optimized. For now, it's saying if the length > 15, give up on uniqueness.
   * An optimization that could be done would be to split the mapping at the last word that was unique,
   * starting iteration from that index, rather than what it's doing now, which is just starting over with
   * all new words altogether.
   * Also very important to note: depending on the input, which could be, say, all 1s, you'll eventually run out
   * of unique words! So that really needs to be accounted for. There's a countByPrefix method on the parser tries,
   * but the nuance of that with mixed inputs (like, 1234567...) is tricky to account for. Can't assert we have unique words
   * remaining by either one or all prefix trees counts combined. The solution would involve keeping track of unique integers
   * and their trie lengths. The K dictionary (currently) only has 9 words, so I'd check if there are 7 K values (which is also a
   * bit tricky, since that MajorSystemMappings index is shared with a second element. So we'd check both K & G lengths. Might be good to
   * store these combinations' lengths as a constant somewhere.
   * @ref https://reactjs.org/docs/error-boundaries.html#how-about-event-handlers
   * @param words - words mapped from elsewhere
   */
  const needsUniqueWords = (words: string[]): boolean => {
    console.debug('Entering needsUniqueWords!');
    if (words.length <= 1) return false;
    if (words.length > MAX_USER_INPUT_LENGTH) {
      throw new Error(
        'Too many words to not get sluggish (or run out of words, depending on the input). WIP!',
      );
    }
    // console.debug('entering needsUniqueWords (for length > 1)');
    const seenWords: Record<string, boolean> = {};
    for (const word of words) {
      console.debug('Checking a word!');
      if (seenWords[word]) return true;
      seenWords[word] = true;
    }
    return false;
  };

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

  const parseValue = (args: IOptionsAndUserInput): string => {
    const { userInput, isUnique } = args;
    const trimmedInput = userInput.trim();
    let suggestedWordsArray: string[];
    do {
      suggestedWordsArray = mapInput(trimmedInput);
    } while (isUnique && needsUniqueWords(suggestedWordsArray));
    return suggestedWordsArray.join('');
  };

  return parseValue;
}

export default Parser;
