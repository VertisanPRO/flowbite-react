import { twMerge } from '@vertisanpro/tailwind-merge';
import type { ComponentProps, FC } from 'react';
import React from 'react';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import type { DeepPartial } from '../../types';
import type { FlowbiteFooterLinkTheme } from './FooterLink';

export interface FlowbiteFooterLinkGroupTheme {
  base: string;
  link: FlowbiteFooterLinkTheme;
  col: string;
}

export interface FooterLinkGroupProps extends ComponentProps<'ul'> {
  col?: boolean;
  theme?: DeepPartial<FlowbiteFooterLinkGroupTheme>;
}

export const FooterLinkGroup: FC<FooterLinkGroupProps> = ({
  children,
  className,
  col = false,
  theme: customTheme = {},
  ...props
}) => {
  const theme = mergeDeep(getTheme().footer.groupLink, customTheme);

  return (
    <ul data-testid="footer-groupLink" className={twMerge(theme.base, col && theme.col, className)} {...props}>
      {children}
    </ul>
  );
};
