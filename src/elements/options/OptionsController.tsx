import React from 'react';
import type { ReactElement } from 'react';

import { UniqueOption } from './UniqueOption';

export type IOptions = {
  isUnique: boolean;
}; // | { otherOption1: type; } | {otherOption2: type; } ...

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
