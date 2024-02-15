import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortDropdown from '../SortDropdown';
import { useRouter } from "next/navigation";

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => '/some/path'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

describe('SortDropdown', () => {
  const replaceMock = jest.fn();
  beforeEach(() => {
    jest.mocked(useRouter).mockImplementation(() => ({
      push: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
      replace: replaceMock,
      refresh: jest.fn(),
    }));
    replaceMock.mockReset();
  });

  it('renders correctly with initial sort criteria', () => {
    render(<SortDropdown sortCriteria="popularity" />);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue('popularity');
  });

  it('updates URL parameters when sort criteria is changed', () => {
    render(<SortDropdown sortCriteria="popularity" />);
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'title' } });

    expect(replaceMock).toHaveBeenCalledWith('/some/path?sortBy=title');
  });
});