import React, { ReactElement } from 'react';

import './App.css';
import Dictionary from './Dictionary';

interface IMajorSuggestionsInputState {
  userInput: string;
  onInputChange: (userInput: string) => void;
}

// todo bring to own file
export class MajorSuggestionsUserInput extends React.Component<IMajorSuggestionsInputState> {
  constructor(props: IMajorSuggestionsInputState) {
    super(props);
    this.changeInput = this.changeInput.bind(this);
  }

  changeInput(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    e.preventDefault();
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

interface IMajorSuggestionsOutputState {
  userInput: string;
}

// todo bring to own file
export const MajorSuggestionsOutput = (
  props: IMajorSuggestionsOutputState,
): ReactElement => {
  const dictionary = new Dictionary();
  const parseValue = dictionary.getParseValue();

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
};

interface IMajorSuggestionsState {
  userInput: string;
}

class App extends React.Component<
  Record<string, never>,
  IMajorSuggestionsState
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.setUserInput = this.setUserInput.bind(this);

    this.state = {
      userInput: '',
    };
  }

  setUserInput(userInput: string): void {
    console.debug('MajorSuggestions#setUserInput', userInput);
    this.setState({
      userInput,
    });
  }

  render(): ReactElement {
    return (
      <div>
        <MajorSuggestionsUserInput
          userInput={this.state.userInput}
          onInputChange={this.setUserInput}
        />
        <br />
        <MajorSuggestionsOutput userInput={this.state.userInput} />
      </div>
    );
  }
}

export default App;
