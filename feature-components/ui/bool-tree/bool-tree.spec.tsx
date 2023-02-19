import React from 'react';
import { render } from '@testing-library/react';
import { BasicBoolTree } from './bool-tree.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicBoolTree />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
