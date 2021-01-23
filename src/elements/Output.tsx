import React from 'react';
import type { ReactElement } from 'react';

import Dictionary from '../Dictionary';
import type { IOptions } from './options/OptionsController';
import type { UserInputState } from 'src/App';
import { CommonTextAreaProperties } from '../Stores';

export type IMajorSuggestionsOutputState = UserInputState;

export function MajorSuggestionsOutput(
  props: IMajorSuggestionsOutputState & IOptions,
): ReactElement {
  const dictionary = new Dictionary();
  const parseValue = dictionary.getParseValue();

  const parsedValue = parseValue(props);
  return (
    <div className="box">
      <label htmlFor="output">Out</label>
      <textarea
        id="output"
        name="output"
        value={parsedValue}
        {...CommonTextAreaProperties}
        readOnly
      />
    </div>
  );
}
