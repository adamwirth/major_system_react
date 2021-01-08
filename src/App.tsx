import React, { ReactElement } from 'react';

import './App.css';

import { MajorSuggestionsUserInput } from './elements/UserInput';
import { MajorSuggestionsOutput } from './elements/Output';
import { IOptions, OptionsController } from './elements/UniqueOption';

interface IMajorSuggestionsState extends IOptions {
  userInput: string;
}

class App extends React.Component {
  state: IMajorSuggestionsState;

  constructor(props: IMajorSuggestionsState) {
    super(props);
    this.setUserInput = this.setUserInput.bind(this);
    this.setOptions = this.setOptions.bind(this);

    this.state = {
      userInput: '',
      isUnique: false,
    };
  }

  setUserInput(userInput: string): void {
    console.debug('MajorSuggestions#setUserInput', userInput);
    this.setState({
      userInput,
    });
  }

  // Change inputs for child modules based on options objects passed in
  // This way I don't have to write more than one changeInput function to pass down
  setOptions(options: IOptions): void {
    console.debug('OptionsController#setOptions', options, { ...options });
    this.setState({ isUnique: options.isUnique }); // todo experiementing, shallow state stuff
  }

  render(): ReactElement {
    return (
      <div>
        <div>
          <MajorSuggestionsUserInput
            userInput={this.state.userInput}
            onInputChange={this.setUserInput}
          />
          <br />
          <MajorSuggestionsOutput userInput={this.state.userInput} />
        </div>
        <div>
          <OptionsController
            options={this.state} // todo could omit userInput
            onOptionsChange={this.setOptions}
          />
        </div>
      </div>
    );
  }
}

export default App;
