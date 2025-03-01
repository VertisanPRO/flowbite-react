'use client';

import { twMerge } from '@vertisanpro/tailwind-merge';
import type { ComponentProps, FC } from 'react';
import React from 'react';
import type { DeepPartial } from '../../types';
import { useDropdownContext } from './DropdownContext';

export interface FlowbiteDropdownDividerTheme {
  divider: string;
}

export type DropdownDividerProps = {
  theme?: DeepPartial<FlowbiteDropdownDividerTheme>;
} & ComponentProps<'div'>;

export const DropdownDivider: FC<DropdownDividerProps> = ({ className, theme: customTheme = {}, ...props }) => {
  const { theme: rootTheme } = useDropdownContext();

  const theme = customTheme.divider ?? rootTheme.floating.divider;

  return <div className={twMerge(theme, className)} {...props} />;
};
