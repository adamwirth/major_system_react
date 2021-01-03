import trie from 'trie-prefix-tree';
import parser from './Parser';

import { assertIsDefined } from './Utils';
import dictionariesHub from './dictionaries/dictionaries';

export type dictionaries = {
  [key: string]: undefined | typeof trie | any; // todo "typeof trie" declaration wasnt working
};

class Dictionary {
  dictionaries: dictionaries; // todo look into how people mention imports (that dont have .d.ts files)
  parse: Function;

  constructor() {
    this.initializeDict = this.initializeDict.bind(this);
    this.getWordsFromNumbers = this.getWordsFromNumbers.bind(this);
    this.updateForUserInput = this.updateForUserInput.bind(this);

    // todo refactor to use state?
    this.dictionaries = {};
    this.parse = parser(this);
  }

  // TODO prefix tree for each first character(s)
  // todo I don't love the naming convention I'm currently using on this
  initializeDict(prefix: string) {
    const lowercasePrefix = prefix.toLowerCase();
    // memoize
    if (this.dictionaries[lowercasePrefix])
      return this.dictionaries[lowercasePrefix];
    const dictionaryArray = dictionariesHub[lowercasePrefix];
    assertIsDefined(dictionaryArray); // todo remove eventually, this has helped define some bugs so far though
    console.debug('after', dictionaryArray);
    this.dictionaries[lowercasePrefix] = trie(dictionaryArray); // todo useMemo stuff?
    console.debug('after2');
    return this.dictionaries[lowercasePrefix];
  }

  getWordsFromNumbers(prefixes: string[]) {
    console.debug('doing getWordsFromNumbers with', ...prefixes);

    const words: string[] = [];
    for (const prefix of prefixes) {
      if (prefix) {
        // todo this logic is tricky here...
        console.debug('getWordsFromNumbers', prefix);
        const dictionary = this.initializeDict(prefix);
        console.debug('after3');
        words.push(dictionary.getRandomWordWithPrefix(prefix));
        console.debug('after4');
      }
    }
    return words;
  }

  updateForUserInput(prefix: string) {
    return this.initializeDict(prefix);
  }

  getParse() {
    return this.parse;
  }
}

export default Dictionary;
