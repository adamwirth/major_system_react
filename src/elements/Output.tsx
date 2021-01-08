import React, { ReactElement } from 'react';
import Dictionary from '../Dictionary';

export interface IMajorSuggestionsOutputState {
  userInput: string;
}

export function MajorSuggestionsOutput(
  props: IMajorSuggestionsOutputState,
): ReactElement {
  const dictionary = new Dictionary();
  const parseValue = dictionary.getParseValue();

  // todo create a custom hook that accepts args from props
  const parsedValue = parseValue(props.userInput);
  return (
    <div className="box">
      <label htmlFor="out">Out</label>
      <textarea
        id="out"
        name="out"
        value={parsedValue}
        cols={50} // todo extract
        rows={3}
        spellCheck={false}
        readOnly
      />
    </div>
  );
}
