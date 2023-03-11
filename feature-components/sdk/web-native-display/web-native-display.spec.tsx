import React from 'react';
import { render } from '@testing-library/react';
import { BasicWebNativeDisplay } from './web-native-display.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicWebNativeDisplay />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
