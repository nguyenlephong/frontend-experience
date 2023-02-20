import React from 'react';
import { render } from '@testing-library/react';
import { BasicAttributeTemplate } from './attribute-template.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicAttributeTemplate />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
