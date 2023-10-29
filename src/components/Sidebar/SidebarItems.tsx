import type { ComponentProps, FC, PropsWithChildren } from 'react';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { getTheme } from '../../theme-store';

export interface SidebarItemsProps extends PropsWithChildren<unknown>, ComponentProps<'div'> {}

export const SidebarItems: FC<SidebarItemsProps> = ({ children, className, ...props }) => {
  const theme = getTheme().sidebar.items;

  return (
    <div className={twMerge(theme, className)} data-testid="flowbite-sidebar-items" {...props}>
      {children}
    </div>
  );
};

SidebarItems.displayName = 'Sidebar.Items';
