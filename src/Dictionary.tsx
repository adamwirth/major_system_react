import trie from 'trie-prefix-tree';

import { assertIsDefined } from './Utils';
import dictionariesHub from './dictionaries/dictionaries';

export type dictionaries = {
    [key: string]: undefined | typeof trie | any; // todo "typeof trie" declaration wasnt working
}
  
class Dictionary {
    dictionaries: dictionaries; // todo look into how people mention imports (that dont have .d.ts files)
    
    constructor() {
      this.initializeDict = this.initializeDict.bind(this);
      this.getWordsFromNumbers = this.getWordsFromNumbers.bind(this); // todo am i messing these up somehow? because im seeing double loggings
      this.updateForUserInput = this.updateForUserInput.bind(this);
      
      // todo refactor to use state?
      this.dictionaries = {};
    }
    
    // TODO prefix tree for each first character(s)
    initializeDict(prefix: string) {
      const lowercasePrefix = prefix.toLowerCase();
      // memoize
      if (this.dictionaries[lowercasePrefix]) return this.dictionaries[lowercasePrefix];
      const dictionaryArray = dictionariesHub[lowercasePrefix];
      assertIsDefined(dictionaryArray);
      console.debug('after', dictionaryArray);
      this.dictionaries[lowercasePrefix] = trie(dictionaryArray); // todo setstate + components?
      console.debug('after2')
      return this.dictionaries[lowercasePrefix];
    }
    
    getWordsFromNumbers(prefixes: string[]) {
      console.debug('doing getWordsFromNumbers with', ...prefixes);
      
      const words : string[] = []
      for (const prefix of prefixes) {
        if (prefix) {
          console.debug('getWordsFromNumbers', prefix)
          const dictionary = this.initializeDict(prefix);
          console.debug('after3');
          words.push(dictionary.getRandomWordWithPrefix(prefix));
          console.debug('after4');
        }
      }
      return words
    }
    
    updateForUserInput(prefix: string) {
      return this.initializeDict(prefix)
    }  
  }
  
  export default Dictionary