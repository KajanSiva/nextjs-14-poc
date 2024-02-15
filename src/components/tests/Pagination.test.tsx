import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Pagination from '../Pagination';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => '/some/path'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

const getButtons = () => ({
  first: screen.getByRole('button', { name: '<<' }),
  previous: screen.getByRole('button', { name: '<' }),
  next: screen.getByRole('button', { name: '>' }),
  last: screen.getByRole('button', { name: '>>' }),
});

describe('Pagination Component', () => {
  const pushMock = jest.fn();
  beforeEach(() => {
    jest.mocked(useRouter).mockImplementation(() => ({
      push: pushMock,
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
    }));
    pushMock.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders with correct page information', () => {
    render(<Pagination currentPage={3} totalPages={5} />);
    expect(screen.getByText(/Page 3 sur 5/)).toBeInTheDocument();
  });

  it('first and previous buttons are disabled on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} />);
    const { first, previous } = getButtons();
    expect(first).toBeDisabled();
    expect(previous).toBeDisabled();
  });

  it('next and last buttons are disabled on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} />);
    const { next, last } = getButtons();
    expect(next).toBeDisabled();
    expect(last).toBeDisabled();
  });

  it('clicking on next button increments the page', () => {
    render(<Pagination currentPage={2} totalPages={5} />);
    const { next } = getButtons();
    fireEvent.click(next);
    expect(pushMock).toHaveBeenCalledWith('/some/path?page=3');
  });

  it('clicking on previous button decrements the page', () => {
    render(<Pagination currentPage={3} totalPages={5} />);
    const { previous } = getButtons();
    fireEvent.click(previous);
    expect(pushMock).toHaveBeenCalledWith('/some/path?page=2');
  });

  it('clicking on first button sets the page to 1', () => {
    render(<Pagination currentPage={4} totalPages={5} />);
    const { first } = getButtons();
    fireEvent.click(first);
    expect(pushMock).toHaveBeenCalledWith('/some/path?page=1');
  });

  it('clicking on last button sets the page to the total pages', () => {
    render(<Pagination currentPage={1} totalPages={5} />);
    const { last } = getButtons();
    fireEvent.click(last);
    expect(pushMock).toHaveBeenCalledWith('/some/path?page=5');
  });
});