'use client';

import { FaBars } from '@vertisanpro/react-icons/fa';
import { twMerge } from '@vertisanpro/tailwind-merge';
import type { ComponentProps, FC } from 'react';
import React from 'react';
import { mergeDeep } from '../../helpers/merge-deep';
import type { DeepPartial } from '../../types';
import { useNavbarContext } from './NavbarContext';

export interface FlowbiteNavbarToggleTheme {
  base: string;
  icon: string;
}

export interface NavbarToggleProps extends ComponentProps<'button'> {
  barIcon?: FC<ComponentProps<'svg'>>;
  theme?: DeepPartial<FlowbiteNavbarToggleTheme>;
}

export const NavbarToggle: FC<NavbarToggleProps> = ({
  barIcon: BarIcon = FaBars,
  className,
  theme: customTheme = {},
  ...props
}) => {
  const { theme: rootTheme, isOpen, setIsOpen } = useNavbarContext();

  const theme = mergeDeep(rootTheme.toggle, customTheme);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button
      data-testid="flowbite-navbar-toggle"
      onClick={handleClick}
      className={twMerge(theme.base, className)}
      {...props}
    >
      <span className="sr-only">Open main menu</span>
      <BarIcon aria-hidden className={theme.icon} />
    </button>
  );
};
