import React from 'react';
import { render } from '@testing-library/react';
import { BasicSelectGroupBox } from './select-group-box.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicSelectGroupBox />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
