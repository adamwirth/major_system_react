import React from 'react';
import type { MouseEvent, ReactElement } from 'react';
import type { MajorSystemEventHandler } from 'src/App';

export type RefreshOptionEvent<HTMLInputElement> = MouseEvent<HTMLInputElement>;

export type IRefreshOptionState = {
  onInputChange: MajorSystemEventHandler['handleChanges'];
};

export function RefreshOption(props: IRefreshOptionState): ReactElement {
  const { onInputChange } = props;
  return (
    <div className="box">
      <label htmlFor="refreshToggle">Refresh</label>
      <input
        id="refreshToggle"
        name="refreshToggle"
        type="button"
        onClick={onInputChange}
      />
    </div>
  );
}
