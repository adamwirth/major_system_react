import React from 'react';

import './App.css';
import Dictionary from './Dictionary';

interface AppProps {}

function App({}: AppProps) {
  return <MajorSuggestionsProvider />;
}

export const MajorSuggestionsUserInput = (props: any) => {
  return (
    <div className="box">
      <span>In</span>
      <textarea
        value={props.userInput}
        onChange={(e) => props.onInputChange(e.target.value)}
        cols={50} // todo extract
        rows={3}
        spellCheck={false}
        autoFocus
      />
    </div>
  );
};

export const MajorSuggestionsOutput = (props: any) => {
  return (
    <div className="box">
      <span>Out</span>
      <textarea
        value={props.parsedValue}
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

class MajorSuggestionsProvider extends React.Component<
  {},
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

  setUserInput(userInput: string) {
    console.debug('MajorSuggestions#setUserInput', userInput);
    this.setState({
      userInput,
      parsedValue: this.parseValue(userInput),
    });
  }

  render() {
    return (
      <div>
        <MajorSuggestionsUserInput onInputChange={this.setUserInput} />
        <br />
        <MajorSuggestionsOutput parsedValue={this.state.parsedValue} />
      </div>
    );
  }
}

export default App;
