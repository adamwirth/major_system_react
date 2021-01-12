import React from 'react';
import type { ChangeEvent, ReactElement } from 'react';

import type { IOptionsUnique } from './OptionsController';
import type { MajorSystemEventHandler } from 'src/App';

export type UniqueOptionEvent<HTMLInputElement> = ChangeEvent<HTMLInputElement>;

export type IUniqueOptionState = IOptionsUnique & {
  onInputChange: MajorSystemEventHandler['handleChanges'];
};

export function UniqueOption(props: IUniqueOptionState): ReactElement {
  const { isUnique, onInputChange } = props;
  return (
    <div className="box">
      <label htmlFor="isUnique">Unique</label>
      <input
        id="isUnique"
        name="isUnique"
        type="checkbox"
        checked={isUnique}
        onChange={onInputChange}
      />
    </div>
  );
}
