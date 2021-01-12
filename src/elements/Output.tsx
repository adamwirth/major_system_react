import React from 'react';
import type { ReactElement } from 'react';

import Dictionary from '../Dictionary';
import type { IOptions } from './options/OptionsController';
import type { UserInputState } from 'src/App';

export type IMajorSuggestionsOutputState = UserInputState;

export function MajorSuggestionsOutput(
  props: IMajorSuggestionsOutputState & IOptions,
): ReactElement {
  const dictionary = new Dictionary();
  const parseValue = dictionary.getParseValue();

  // todo create a custom hook that accepts args from props
  const parsedValue = parseValue(props);
  return (
    <div className="box">
      <label htmlFor="output">Out</label>
      <textarea
        id="output"
        name="output"
        value={parsedValue}
        cols={50} // todo extract
        rows={3}
        spellCheck={false}
        readOnly
      />
    </div>
  );
}
