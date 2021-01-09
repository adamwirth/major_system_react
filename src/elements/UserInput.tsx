import React from 'react';
import type { ReactElement } from 'react';

export interface IMajorSuggestionsInputState {
  userInput: string;
  onInputChange: (userInput: string) => void;
}

export class MajorSuggestionsUserInput extends React.Component<IMajorSuggestionsInputState> {
  constructor(props: IMajorSuggestionsInputState) {
    super(props);
    this.changeInput = this.changeInput.bind(this);
  }

  changeInput(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.props.onInputChange(e.target.value);
  }

  render(): ReactElement {
    const { userInput } = this.props;
    return (
      <div className="box">
        <label htmlFor="in">In</label>
        <textarea
          id="in"
          name="in"
          value={userInput}
          onChange={this.changeInput}
          cols={50} // todo extract
          rows={3}
          spellCheck={false}
        />
      </div>
    );
  }
}
