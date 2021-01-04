import trie from 'trie-prefix-tree';
import parser from './Parser';

import { assertIsDefined } from './Utils';
import dictionariesHub from './dictionaries/dictionaries';

export type DictionaryType = {
  [key: string]: undefined | typeof trie | any; // todo "typeof trie" declaration wasnt working
};

class Dictionary {
  dictionaries: DictionaryType;

  parseValue: (input: string) => string;

  constructor() {
    this.initializeDict = this.initializeDict.bind(this);
    this.getWordFromChar = this.getWordFromChar.bind(this);

    // todo refactor to use state?
    this.dictionaries = {};
    this.parseValue = parser(this);
  }

  // TODO prefix tree for each first character(s)
  // todo I don't love the naming convention I'm currently using on this
  initializeDict(prefix: string): DictionaryType[string] {
    const lowercasePrefix = prefix.toLowerCase();
    // memoize
    if (this.dictionaries[lowercasePrefix]) {
      return this.dictionaries[lowercasePrefix];
    }
    const dictionaryArray = dictionariesHub[lowercasePrefix];
    // todo remove eventually, this has helped define some bugs so far though
    assertIsDefined(dictionaryArray);
    console.debug('after', dictionaryArray);

    this.dictionaries[lowercasePrefix] = trie(dictionaryArray); // todo useMemo stuff?
    console.debug('after2');

    return this.dictionaries[lowercasePrefix];
  }

  getWordFromChar(char: string): string {
    return this.initializeDict(char).getRandomWordWithPrefix(char);
  }

  getParseValue(): (input: string) => string {
    return this.parseValue;
  }
}

export default Dictionary;
