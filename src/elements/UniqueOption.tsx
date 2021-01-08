import React, { ReactElement } from 'react';

export type IOptions = {
  isUnique: boolean;
}; // | { otherOption1: type; } | {otherOption2: type; } ...

export interface IUniqueOptionState extends IOptions {
  readonly onInputChange: (options: IOptions) => void;
}

export class UniqueOption extends React.Component<IUniqueOptionState> {
  constructor(props: IUniqueOptionState) {
    super(props);
    this.changeInput = this.changeInput.bind(this);
  }

  changeInput(e: React.ChangeEvent<HTMLInputElement>): void {
    console.debug(e.target.checked, this.props.isUnique);
    const isUnique = e.target.checked;
    this.props.onInputChange({ isUnique }); // todo test
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

export interface IOptionsController {
  options: IOptions;
  onOptionsChange: (options: IOptions) => void;
}

export class OptionsController extends React.Component<IOptionsController> {
  constructor(props: IOptionsController) {
    super(props);
  }

  render(): ReactElement {
    const { isUnique } = this.props.options;
    return (
      <div className="optionsArea">
        <UniqueOption
          isUnique={isUnique}
          onInputChange={this.props.onOptionsChange}
        />
      </div>
    );
  }
}
