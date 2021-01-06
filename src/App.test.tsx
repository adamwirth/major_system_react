import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'chai';
import App from './App';

describe('<App>', () => {
  let userInput: HTMLElement;
  let output: HTMLElement;
  beforeEach(() => {
    render(<App />);
    userInput = screen.getByLabelText(/in/i);
    output = screen.getByLabelText(/out/i);
  });

  for (let i = 0; i < 10; i++) {
    it(`has text render on numerical input ${i}`, () => {
      const text = i.toString();
      userEvent.type(userInput, text);
      expect(output.innerHTML).to.be.a('string').of.length.gt(1);
    });
  }
});
