import trie from 'trie-prefix-tree';
import parser from './Parser';

import dictionariesHub from './dictionaries/dictionaries';
import type { IOptions } from './elements/options/OptionsController';

type Trie = typeof trie;

export type DictionaryType = {
  [key: string]: ReturnType<Trie>;
};

export type IOptionsAndUserInput = IOptions & { userInput: string };

class Dictionary {
  dictionaries: DictionaryType;

  parseValue: (args: IOptionsAndUserInput) => string;

  constructor() {
    this.getDict = this.getDict.bind(this);
    this.memoizeDict = this.memoizeDict.bind(this);
    this.getWordFromChar = this.getWordFromChar.bind(this);

    // todo refactor to use state?
    this.dictionaries = {};
    this.parseValue = parser(this);
  }

  // todo I don't love the naming convention I'm currently using on this
  getDict(prefix: string): DictionaryType[string] {
    /**While I could try using useMemo (https://www.robinwieruch.de/react-usememo-hook)
     * -- I don't like that it doesn't guarantee holding on to memoized things (as of this writing) */
    const lowercasePrefix = prefix.toLowerCase();

    // Return memoized value if the work's already been done
    if (this.dictionaries[lowercasePrefix]) {
      return this.dictionaries[lowercasePrefix];
    }

    return this.memoizeDict(lowercasePrefix);
  }

  memoizeDict(lowercasePrefix: string): DictionaryType[string] {
    const dictionaryArray = dictionariesHub[lowercasePrefix];

    this.dictionaries[lowercasePrefix] = trie(dictionaryArray);

    return this.dictionaries[lowercasePrefix];
  }

  getWordFromChar(char: string): string {
    return this.getDict(char).getRandomWordWithPrefix(char);
  }

  getParseValue(): Dictionary['parseValue'] {
    return this.parseValue;
  }
}

export default Dictionary;
