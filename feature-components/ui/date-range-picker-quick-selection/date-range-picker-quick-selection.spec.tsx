import React from 'react';
import { render } from '@testing-library/react';
import { BasicDateRangePickerQuickSelection } from './date-range-picker-quick-selection.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicDateRangePickerQuickSelection />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
