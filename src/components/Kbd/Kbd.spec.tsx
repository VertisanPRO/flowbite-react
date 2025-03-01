import { render, screen } from '@testing-library/react';
import { MdKeyboardArrowLeft, MdKeyboardCommandKey } from '@vertisanpro/react-icons/md';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { Flowbite, type CustomFlowbiteTheme } from '../Flowbite';
import { Kbd } from './Kbd';

describe('Components / Kbd', () => {
  describe('Theme', () => {
    it('should use custom `base` classes', () => {
      const theme: CustomFlowbiteTheme = {
        kbd: {
          root: {
            base: 'bg-yellow-400 dark:bg-yellow-40',
          },
        },
      };
      render(
        <Flowbite theme={{ theme }}>
          <Kbd />
        </Flowbite>,
      );

      expect(kbd()).toBeInTheDocument();
      expect(kbd()).toHaveClass('bg-yellow-400 dark:bg-yellow-40');
    });
  });

  describe('Rendering', () => {
    it('should render when `children={0}`', () => {
      render(<Kbd>0</Kbd>);
      expect(kbd()).toHaveTextContent('0');
    });

    it('should show icon when render', () => {
      render(<Kbd icon={MdKeyboardArrowLeft} />);

      expect(kbd()).toBeInTheDocument();
      expect(kbd().childNodes[0]).toContainHTML('svg');
    });

    it('should show icon and children when render', () => {
      render(<Kbd icon={MdKeyboardCommandKey}>command</Kbd>);

      expect(kbd()).toBeInTheDocument();
      expect(kbd().childNodes[0]).toContainHTML('svg');
      expect(kbd()).toHaveTextContent('command');
    });
  });
});

const kbd = () => screen.getByTestId('flowbite-kbd');
