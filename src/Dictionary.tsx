import trie from 'trie-prefix-tree';
import parser from './Parser';

import { assertIsDefined } from './Utils';
import dictionariesHub from './dictionaries/dictionaries';

type Trie = typeof trie;

export type DictionaryType = {
  [key: string]: ReturnType<Trie>;
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
    // todo could try using useMemo (https://www.robinwieruch.de/react-usememo-hook)
    // -- but what I have is fine I think. I also don't see it making the code much more conscise, sadly
    const lowercasePrefix = prefix.toLowerCase();
    // memoize
    if (this.dictionaries[lowercasePrefix]) {
      return this.dictionaries[lowercasePrefix];
    }
    const dictionaryArray = dictionariesHub[lowercasePrefix];
    // todo remove eventually, this has helped define some bugs so far though
    assertIsDefined(dictionaryArray);

    this.dictionaries[lowercasePrefix] = trie(dictionaryArray);

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
