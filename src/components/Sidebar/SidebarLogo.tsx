'use client';

import { twMerge } from '@vertisanpro/tailwind-merge';
import { nanoid } from 'nanoid';
import type { ComponentProps, FC } from 'react';
import React, { useMemo } from 'react';
import { mergeDeep } from '../../helpers/merge-deep';
import type { DeepPartial } from '../../types';
import type { FlowbiteBoolean } from '../Flowbite';
import { useSidebarContext } from './SidebarContext';

export interface FlowbiteSidebarLogoTheme {
  base: string;
  collapsed: FlowbiteBoolean;
  img: string;
}

export interface SidebarLogoProps extends ComponentProps<'a'> {
  href: string;
  img: string;
  imgAlt?: string;
  theme?: DeepPartial<FlowbiteSidebarLogoTheme>;
}

export const SidebarLogo: FC<SidebarLogoProps> = ({
  children,
  className,
  href,
  img,
  imgAlt = '',
  theme: customTheme = {},
  ...props
}) => {
  const id = useMemo(() => nanoid(), []);
  const { theme: rootTheme, isCollapsed } = useSidebarContext();

  const theme = mergeDeep(rootTheme.logo, customTheme);

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
