import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders app correctly', () => {
    render(<App />);
    const linkElement = screen.getByText(/home/i);
    expect(linkElement).toBeInTheDocument();
  });
});
