import React, { useState, useContext } from 'react';

import './App.css';
import Dictionary from './Dictionary';

interface AppProps {}

function App({}: AppProps) {
  return <MajorSuggestionsProvider></MajorSuggestionsProvider>;
}

export const MajorSuggestionsUserInput = (props: any) => {
  const { userInput, setUserInput } = props;
  const onUserInputChange = (e: any) => {
    setUserInput(e.target.value);
  };
  console.debug('MajorSuggestionsInput#beforeRender');
  return (
    <div className="box">
      <span>In</span>
      <textarea
        value={userInput}
        onChange={onUserInputChange} // todo pass e.target.value thing
        cols={50} // todo extract
        rows={3}
        spellCheck={false}
        autoFocus
      />
    </div>
  );
};

export const MajorSuggestionsOutput = (props: any) => {
  const { dictionary, userInput } = props;
  const parseValue = dictionary.getParse();

  console.debug('MajorSuggestionsOutput#beforeRender');
  const parsedValue = parseValue(userInput);
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
  dictionary: Dictionary;
  userInput: string;
  setUserInput: any;
}

export class MajorSuggestionsProvider extends React.Component<
  {},
  IMajorSuggestionsState
> {
  constructor(props: any) {
    super(props);

    const setUserInput = (userInput: string) => {
      console.debug('MajorSuggestions#setUserInput', userInput);

      this.setState({ userInput });
    };

    this.state = {
      dictionary: new Dictionary(),
      userInput: '',
      setUserInput,
    };
  }

  render() {
    const userInput = this.state.userInput;
    return (
      <div>
        <MajorSuggestionsUserInput
          userInput={userInput}
          setUserInput={this.state.setUserInput}
        />
        <MajorSuggestionsOutput
          dictionary={this.state.dictionary}
          userInput={userInput}
        />
      </div>
    );
  }
}

export default App;
