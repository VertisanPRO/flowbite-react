import { twMerge } from '@vertisanpro/tailwind-merge';
import type { ComponentProps, FC } from 'react';
import React from 'react';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import type { DeepPartial } from '../../types';

export interface FlowbiteKbdTheme {
  root: FlowbiteKbdRootTheme;
}

export interface FlowbiteKbdRootTheme {
  base: string;
  icon: string;
}

export interface KbdProps extends ComponentProps<'span'> {
  icon?: FC<ComponentProps<'svg'>>;
  theme?: DeepPartial<FlowbiteKbdTheme>;
}

export const Kbd: FC<KbdProps> = ({ children, className, icon: Icon, theme: customTheme = {}, ...props }) => {
  const theme = mergeDeep(getTheme().kbd, customTheme);

  return (
    <span className={twMerge(theme.root.base, className)} data-testid="flowbite-kbd" {...props}>
      {Icon && <Icon className={theme.root.icon} data-testid="flowbite-kbd-icon" />}
      {children}
    </span>
  );
};

Kbd.displayName = 'Kbd';
