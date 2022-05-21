import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/Question';
import Question from '../components/Question';

test('component says hi mom', () => {
  render(<Question />);
  const questionElement = screen.getByText(/hi mom/i);
  expect(questionElement).toBeInTheDocument();
});