import { render, screen } from '@testing-library/react';

import App from './App';

test('renders app text correctly', () => {
  render(<App />);
  const linkElement = screen.getByText(/posts/i);
  expect(linkElement).toBeInTheDocument();
});
