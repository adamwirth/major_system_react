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
export class MajorSuggestionsOutput extends React.Component<IMajorSuggestionsOutputState> {
  dictionary: Dictionary;

  parseValue: (input: string) => string;

  constructor(props: IMajorSuggestionsOutputState) {
    super(props);

    this.dictionary = new Dictionary();
    this.parseValue = this.dictionary.getParseValue();
  }

  render(): ReactElement {
    const parsedValue = this.parseValue(this.props.userInput);
    return (
      <div className="box">
        <label htmlFor="out">Out</label>
        <textarea
          id="out"
          value={parsedValue}
          cols={50} // todo extract
          rows={3}
          spellCheck={false}
          readOnly
        />
      </div>
    );
  }
}

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
