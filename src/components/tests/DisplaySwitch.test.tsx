import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DisplaySwitch from '../DisplaySwitch';
import { useRouter } from "next/navigation";
import { DisplayMode } from '@/types/ui';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => '/some/path'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

describe('DisplaySwitch', () => {
  const displayModes: DisplayMode[] = ['list', 'grid'];
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

  displayModes.forEach(mode => {
    test(`renders and can select ${mode} mode`, () => {
      render(<DisplaySwitch displayMode={mode} />);

      const listIcon = screen.getByTestId('list-icon');
      const gridIcon = screen.getByTestId('grid-icon');

      expect(listIcon).toBeInTheDocument();
      expect(gridIcon).toBeInTheDocument();

      fireEvent.click(mode === 'list' ? listIcon : gridIcon);

      expect(replaceMock).toHaveBeenCalledWith(expect.stringContaining(`display=${mode}`));
    });
  });
});