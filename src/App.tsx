import React from 'react';
import type { ReactElement } from 'react';

import './App.css';

import { MajorSuggestionsUserInput } from './elements/UserInput';
import type { MajorSuggestionsUserInputEvent as UserInputEvent } from './elements/UserInput';
import { MajorSuggestionsOutput } from './elements/Output';
import type { IOptions } from './elements/options/OptionsController';
import { OptionsController } from './elements/options/OptionsController';
import type { UniqueOptionEvent } from './elements/options/UniqueOption';
import type { RefreshOptionEvent } from './elements/options/RefreshOption';

export type UserInputState = { userInput: string };
export type ErrorBoundaryState = { hasError: string };

export type MajorSuggestionsState = IOptions &
  UserInputState &
  ErrorBoundaryState;

export type PossibleEvents =
  | UniqueOptionEvent<HTMLInputElement>
  | RefreshOptionEvent<HTMLInputElement>
  | UserInputEvent<HTMLTextAreaElement>;

export interface MajorSystemEventHandler {
  handleChanges: (event: PossibleEvents) => void;
}

class App extends React.Component implements MajorSystemEventHandler {
  state: MajorSuggestionsState;

  constructor(props: MajorSuggestionsState) {
    super(props);
    this.handleChanges = this.handleChanges.bind(this);

    this.state = {
      userInput: '',
      hasError: '',
      isUnique: false,
      refreshToggle: false,
    };
  }

  /**
   * @desc "Update state so the next render will show the fallback UI.""
   * @ref https://reactjs.org/docs/react-component.html#static-getderivedstatefromerror */
  static getDerivedStateFromError(
    error: Error,
  ): Partial<MajorSuggestionsState> {
    console.debug('getDerivedStateFromError', error);
    return { hasError: error.message };
  }

  /* Change inputs for child modules based on options objects passed in
   * This way I don't have to write more than one changeInput function to pass down
   */
  handleChanges(event: PossibleEvents): void {
    console.debug('OptionsController#handleChildrensChanges', event);
    // This could also be HTMLTextAreaElement, but I couldn't get it to work out tbqh
    const target = event.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  render(): ReactElement {
    return (
      <div className="flex">
        {!!this.state.hasError && (
          <span className="mb-10">Error!!! + {this.state.hasError}</span>
        )}
        <div className="box__mt-25">
          <MajorSuggestionsUserInput
            userInput={this.state.userInput}
            changeHandler={this.handleChanges}
          />
          <MajorSuggestionsOutput
            userInput={this.state.userInput}
            isUnique={this.state.isUnique}
            refreshToggle={this.state.refreshToggle}
          />
        </div>
        <div className="ml-10 box__mt-10">
          <OptionsController
            isUnique={this.state.isUnique}
            refreshToggle={this.state.refreshToggle}
            changeHandler={this.handleChanges}
          />
        </div>
      </div>
    );
  }
}

export default App;
