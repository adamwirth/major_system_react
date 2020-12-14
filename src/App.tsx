import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { MajorSystemMappings } from './Stores';

interface AppProps {}

function App({}: AppProps) {
  // Create the count state.
  const [count, setCount] = useState(0);
  // Create the counter (+1 every second).
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  // Return the App component.
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          Page has been open for <code>{count}</code> seconds.
        </p>
        <br/>
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
  constructor(props: { onInputChange: Function, userInput: string }) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e: any) {
    this.props.onInputChange(e.target.value);
  }
  
  render() {
    const value = this.props.userInput;
    return (
      <textarea
        value={value}
        onChange={this.handleChange}
      />
    )
  }
}

class MajorSuggestionsOutput extends React.Component<IMajorSuggestionsChildrenProps> {
  constructor(props: { onInputChange: Function, userInput: string }) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.parseValue = this.parseValue.bind(this);
  }
  
  handleChange(e: any) {
    this.props.onInputChange(e.target.value);
  }
  
  parseValue(input: string) {
    return [...input].map(value => {
      const intValue = parseInt(value);
      if (intValue === NaN) return ''
      const chosenMapping: string[] = MajorSystemMappings[intValue]
      let chosenIdx
      if (chosenMapping.length === 1) {
        chosenIdx = 0 
      } else {
        chosenIdx = Math.floor(Math.random() * 2)
      }
      return chosenMapping[chosenIdx]
    }).join('')
  }
  
  render() {
    const value: string = this.props.userInput;
    const parsedValue = this.parseValue(value);
    return (
      <textarea 
        readOnly
        value={parsedValue}
        onChange={this.handleChange}
      />
    )
  }
}

interface IMajorSuggestionsState {
  userInput: string;
}

class MajorSuggestions extends React.Component<{}, IMajorSuggestionsState> {
  constructor(props: any) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.changeOutput = this.changeOutput.bind(this);
    this.state = {userInput: ''};
  }
  
  onInputChange(userInput: string) {
    this.setState({userInput});
    console.log('MajorSuggestions#onInputChange', this.state, userInput);
  }
  
  changeOutput(userInput: string) {
    this.setState({userInput});
    console.log('MajorSuggestions#changeOutput', this.state, userInput);
  }
  
  render() {
    const userInput: string = this.state.userInput;
    return (
      <div>
        <MajorSuggestionsUserInput 
          userInput={userInput}
          onInputChange={this.onInputChange}
        />
        <br/>
        <MajorSuggestionsOutput 
          userInput={userInput}
          onInputChange={this.changeOutput}
        />
      </div>
    )
  }
}


export default App;
