import type { ComponentProps, ElementType, FC, PropsWithChildren } from 'react';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import type { DeepPartial } from '../../';
import { useTheme } from '../../';
import { mergeDeep } from '../../helpers/merge-deep';

export interface FlowbiteFooterLinkTheme {
  base: string;
  href: string;
}

export interface FooterLinkProps extends PropsWithChildren<unknown>, ComponentProps<'a'> {
  as?: ElementType;
  href: string;
  theme?: DeepPartial<FlowbiteFooterLinkTheme>;
}

export const FooterLink: FC<FooterLinkProps> = ({
  as: Component = 'a' as JSX.ElementType,
  children,
  className,
  href,
  theme: customTheme = {},
  ...props
}) => {
  const theme = mergeDeep(useTheme().theme.footer.groupLink.link, customTheme);

  return (
    <li className={twMerge(theme.base, className)}>
      <Component href={href} className={theme.href} {...props}>
        {children}
      </Component>
    </li>
  );
};
