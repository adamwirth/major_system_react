import React from 'react';
import type { ReactElement } from 'react';

import type { IOptions } from './OptionsController';

export interface IUniqueOptionState extends IOptions {
  readonly onInputChange: (options: IOptions) => void;
}

export class UniqueOption extends React.Component<IUniqueOptionState> {
  constructor(props: IUniqueOptionState) {
    super(props);
    this.changeInput = this.changeInput.bind(this);
  }

  changeInput(e: React.ChangeEvent<HTMLInputElement>): void {
    const isUnique = e.target.checked;
    this.props.onInputChange({ isUnique });
  }

  render(): ReactElement {
    return (
      <div className="box">
        <label htmlFor="unique">Unique</label>
        <input
          id="unique"
          name="unique"
          type="checkbox"
          checked={this.props.isUnique} // todo maybe value, maybe neither
          onChange={this.changeInput}
        />
      </div>
    );
  }
}
