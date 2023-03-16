import React from 'react';
import { render } from '@testing-library/react';
import { BasicMathematicalExpressions } from './mathematical-expressions.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicMathematicalExpressions />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
