import React, { ReactNode } from 'react';

import './App.css';
import Dictionary from './Dictionary';

// todo bring to own files
export const MajorSuggestionsUserInput = (props: any): ReactNode => {
  const { onInputChange, userInput } = props;
  return (
    <div className="box">
      <span>In</span>
      <textarea
        value={userInput}
        onChange={(e) => onInputChange(e.target.value)}
        cols={50} // todo extract
        rows={3}
        spellCheck={false}
      />
    </div>
  );
};

export const MajorSuggestionsOutput = (props: any): ReactNode => {
  const { parsedValue } = props;
  return (
    <div className="box">
      <span>Out</span>
      <textarea
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
  parsedValue: string;
}

class App extends React.Component<
  Record<string, never>,
  IMajorSuggestionsState
> {
  dictionary: Dictionary;

  parseValue: any;

  constructor(props: any) {
    super(props);
    this.setUserInput = this.setUserInput.bind(this);

    this.dictionary = new Dictionary();
    this.parseValue = this.dictionary.getParseValue();

    this.state = {
      userInput: '',
      parsedValue: '',
    };
  }

  setUserInput(userInput: string): void {
    console.debug('MajorSuggestions#setUserInput', userInput);
    this.setState({
      userInput,
      parsedValue: this.parseValue(userInput),
    });
  }

  render(): ReactNode {
    const { parsedValue } = this.state;
    return (
      <div>
        <MajorSuggestionsUserInput onInputChange={this.setUserInput} />
        <br />
        <MajorSuggestionsOutput parsedValue={parsedValue} />
      </div>
    );
  }
}

export default App;
