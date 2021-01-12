import React from 'react';
import type { ReactElement } from 'react';

import { UniqueOption } from './UniqueOption';
import { RefreshOption } from './RefreshOption';
import type { MajorSystemEventHandler } from 'src/App';

export type IOptions = { isUnique: boolean; refreshToggle: boolean };

export type IOptionsUnique = Pick<IOptions, 'isUnique'>;

export type IOptionsRefresh = Pick<IOptions, 'refreshToggle'>;

export type IOptionsController = IOptions & {
  changeHandler: MajorSystemEventHandler['handleChanges'];
};

export function OptionsController(props: IOptionsController): ReactElement {
  const { changeHandler, isUnique } = props;
  return (
    <div className="optionsArea">
      <UniqueOption isUnique={isUnique} onInputChange={changeHandler} />
      <RefreshOption onInputChange={changeHandler} />
    </div>
  );
}
