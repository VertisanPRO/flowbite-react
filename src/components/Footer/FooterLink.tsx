import { twMerge } from '@vertisanpro/tailwind-merge';
import type { ComponentProps, ElementType, FC } from 'react';
import React from 'react';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import type { DeepPartial } from '../../types';

export interface FlowbiteFooterLinkTheme {
  base: string;
  href: string;
}

export interface FooterLinkProps extends ComponentProps<'a'> {
  as?: ElementType;
  href: string;
  theme?: DeepPartial<FlowbiteFooterLinkTheme>;
}

export const FooterLink: FC<FooterLinkProps> = ({
  as: Component = 'a',
  children,
  className,
  href,
  theme: customTheme = {},
  ...props
}) => {
  const theme = mergeDeep(getTheme().footer.groupLink.link, customTheme);

  return (
    <li className={twMerge(theme.base, className)}>
      <Component href={href} className={theme.href} {...props}>
        {children}
      </Component>
    </li>
  );
};
