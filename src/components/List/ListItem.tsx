import { twMerge } from '@vertisanpro/tailwind-merge';
import type { FC, PropsWithChildren } from 'react';
import React from 'react';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import type { DeepPartial } from '../../types';

export interface FlowbiteListItemTheme {
  base: string;
}

export interface ListItemProps extends PropsWithChildren<unknown> {
  theme?: DeepPartial<FlowbiteListItemTheme>;
  className?: string;
}

export const ListItem: FC<ListItemProps> = ({ children, className, theme: customTheme = {} }) => {
  const theme = mergeDeep(getTheme().listGroup.item, customTheme);

  return <li className={twMerge(theme.base, className)}>{children}</li>;
};
