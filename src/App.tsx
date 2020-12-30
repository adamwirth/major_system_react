import React, { useState, useEffect, useContext } from 'react';

import './App.css';
import Dictionary from './Dictionary';

interface AppProps {}

function App({}: AppProps) {
  return (
    <MajorSuggestionsContextProvider>
      <MajorSuggestionsUserInput />
      <MajorSuggestionsOutput />
    </MajorSuggestionsContextProvider>
  );
}

const defaultContext = {
  dictionary: new Dictionary(),
  userInput: '',
  setUserInput: (e: any) => {},
};

const UserInputContext = React.createContext(defaultContext);

export const MajorSuggestionsUserInput = (props: any) => {
  const { userInput, setUserInput } = useContext(UserInputContext);
  const onUserInputChange = (e: any) => {
    setUserInput(e.target.value);
  };
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
  const { dictionary, userInput } = useContext(UserInputContext);
  const parseValue = dictionary.getParse();

  console.debug('MajorSuggestionsOutput#beforeRender');
  const parsedValue = parseValue(userInput);
  return (
    <div className="box">
      <span>Out</span>
      <textarea
        value={parsedValue}
        onChange={(e) => dictionary.updateForUserInput(e.target.value)} // todo pass e.target.value thing
        cols={50} // todo extract
        rows={3}
        spellCheck={false}
        readOnly
      />
    </div>
  );
};

export const MajorSuggestionsContextProvider = (props: any) => {
  const setUserInput = (userInput: string) => {
    console.debug('MajorSuggestions#setUserInput', userInput);

    setState({
      ...state,
      userInput,
    });
  };

  const initialState = {
    ...defaultContext,
    setUserInput,
  };

  const [state, setState] = useState(initialState);
  return (
    <UserInputContext.Provider value={state}>
      {props.children}
    </UserInputContext.Provider>
  );
};

export default App;
