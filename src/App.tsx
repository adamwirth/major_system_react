import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import Dictionary from './Dictionary';
import parser from './Parser';

interface AppProps {}

function App({}: AppProps) {
  // Create the count state.
  // const [count, setCount] = useState(0);
  // Create the counter (+1 every second).
  // useEffect(() => {
  //   const timer = setTimeout(() => setCount(count + 1), 1000);
  //   return () => clearTimeout(timer);
  // }, [count, setCount]);
  // Return the App component.
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <br />
        <MajorSuggestions />
      </header>
    </div>
  );
}

interface IMajorSuggestionsChildrenProps {
  onInputChange: Function;
  userInput: string;
}

class MajorSuggestionsUserInput extends React.Component<IMajorSuggestionsChildrenProps> {
  constructor(props: { onInputChange: Function; userInput: string }) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: any) {
    console.debug('MajorSuggestionsUserInput#handleChange', e, e.target.value);

    this.props.onInputChange(e.target.value);
  }

  render() {
    const value = this.props.userInput;
    return <textarea value={value} onChange={this.handleChange} />;
  }
}

class MajorSuggestionsOutput extends React.Component<
  IMajorSuggestionsChildrenProps & { dictionary: Dictionary }
> {
  parseValue: Function;

  constructor(props: {
    onInputChange: Function;
    userInput: string;
    dictionary: Dictionary;
  }) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.parseValue = parser(this.props.dictionary);
  }

  handleChange(e: any) {
    console.debug('MajorSuggestionsOutput#handleChange', e, e.target.value);

    this.props.onInputChange(e.target.value);
  }

  render() {
    const value: string = this.props.userInput;
    const parsedValue = value ? this.parseValue(value) : '';
    return (
      <textarea
        readOnly
        value={parsedValue} // todo parse arrays
        // onChange={this.handleChange}
      />
    );
  }
}

interface IMajorSuggestionsState {
  userInput: string;
}

class MajorSuggestions extends React.Component<{}, IMajorSuggestionsState> {
  dictionary: Dictionary;
  constructor(props: any) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.changeOutput = this.changeOutput.bind(this);
    this.state = {
      userInput: '',
    };
    this.dictionary = new Dictionary();
  }

  onInputChange(userInput: string) {
    console.debug('MajorSuggestions#onInputChange', userInput);
    this.setState({ userInput });
  }

  changeOutput(userInput: string) {
    console.debug('MajorSuggestions#changeOutput', userInput);

    this.dictionary.updateForUserInput(userInput);
    // this.setState({
    //   userInput,
    // });
  }

  render() {
    const userInput: string = this.state.userInput;
    return (
      <div>
        <MajorSuggestionsUserInput
          userInput={userInput}
          onInputChange={this.onInputChange}
        />
        <br />
        <MajorSuggestionsOutput
          userInput={userInput}
          onInputChange={this.changeOutput}
          dictionary={this.dictionary}
        />
      </div>
    );
  }
}

export default App;
