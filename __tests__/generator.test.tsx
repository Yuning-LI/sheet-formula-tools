import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Home from '../app/page';

describe('Generator flow', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders, submits, and shows the generated formula', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      headers: { get: () => 'application/json' },
      json: async () => ({ formula: '=SUM(A:A)' }),
    });

    vi.stubGlobal('fetch', mockFetch);

    render(<Home />);

    const textarea = screen.getByPlaceholderText(
      /Sum column A if column B contains the word Sales/i
    );
    fireEvent.change(textarea, { target: { value: 'Sum column A' } });

    const button = screen.getByRole('button', { name: /Generate Formula/i });
    fireEvent.click(button);

    await screen.findByText('=SUM(A:A)');
  });
});
