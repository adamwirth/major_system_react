import React from 'react';
import type { ChangeEvent, ReactElement } from 'react';

import type { UserInputState, MajorSystemEventHandler } from 'src/App';

export type MajorSuggestionsUserInputEvent<
  HTMLTextAreaElement
> = ChangeEvent<HTMLTextAreaElement>;

export type IMajorSuggestionsInputState = UserInputState & {
  changeHandler: MajorSystemEventHandler['handleChanges'];
};

export function MajorSuggestionsUserInput(
  props: IMajorSuggestionsInputState,
): ReactElement {
  const { changeHandler, userInput } = props;
  return (
    <div className="box">
      <label htmlFor="userInput">In</label>
      <textarea
        id="userInput"
        name="userInput"
        value={userInput}
        onChange={changeHandler}
        cols={50} // todo extract
        rows={3}
        spellCheck={false}
      />
    </div>
  );
}
