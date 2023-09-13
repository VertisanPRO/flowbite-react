import React from 'react';
import { nanoid } from 'nanoid';
import type { ComponentProps, FC, PropsWithChildren } from 'react';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import type { DeepPartial, FlowbiteBoolean } from '../../';
import { useTheme } from '../../';
import { mergeDeep } from '../../helpers/merge-deep';
import { useSidebarContext } from './SidebarContext';

export interface FlowbiteSidebarLogoTheme {
  base: string;
  collapsed: FlowbiteBoolean;
  img: string;
}

export interface SidebarLogoProps extends PropsWithChildren<unknown>, ComponentProps<'a'> {
  href: string;
  img: string;
  imgAlt?: string;
  theme?: DeepPartial<FlowbiteSidebarLogoTheme>;
}

const SidebarLogo: FC<SidebarLogoProps> = ({
  children,
  className,
  href,
  img,
  imgAlt = '',
  theme: customTheme = {},
  ...props
}) => {
  const id = useMemo(() => nanoid(), []);
  const { isCollapsed } = useSidebarContext();
  const theme = mergeDeep(useTheme().theme.sidebar.logo, customTheme);

  return (
    <a
      aria-labelledby={`flowbite-sidebar-logo-${id}`}
      href={href}
      className={twMerge(theme.base, className)}
      {...props}
    >
      <img alt={imgAlt} src={img} className={theme.img} />
      <span className={theme.collapsed[isCollapsed ? 'on' : 'off']} id={`flowbite-sidebar-logo-${id}`}>
        {children}
      </span>
    </a>
  );
};

SidebarLogo.displayName = 'Sidebar.Logo';
export default SidebarLogo;
