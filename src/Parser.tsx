import { MajorSystemMappings } from "./Stores";
import { pickRandomArrayElement } from "./Utils";
import type Dictionary from './Dictionary'

function Parser(dictionary: Dictionary) {
    
const mapNumbers = (input: string) => {
    return [...input].map(value => {
     const intValue = parseInt(value);
     if (isNaN(intValue)) return ''
     const chosenMapping: string[] = MajorSystemMappings[intValue];
     return pickRandomArrayElement(chosenMapping)
   })
 }
 
 const mapCharacters = (mappedInput: string[]) => {
   return dictionary.getWordsFromNumbers(mappedInput)
 }
 
 const parseValue = (input: string) => {
   const characters = mapNumbers(input);
   const suggestedWords = mapCharacters(characters);
   console.debug('parseValue', input, characters, suggestedWords);
   return suggestedWords
 }
 
 return parseValue
}

export default Parser
