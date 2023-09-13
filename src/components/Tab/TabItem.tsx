import React from 'react';
import type { ComponentProps, FC, PropsWithChildren, ReactNode } from 'react';

export interface TabItemProps extends PropsWithChildren<unknown>, Omit<ComponentProps<'div'>, 'title'> {
  active?: boolean;
  disabled?: boolean;
  icon?: FC<ComponentProps<'svg'>>;
  title: ReactNode;
}

export const TabItem: FC<TabItemProps> = ({ children, className }) => <div className={className}>{children}</div>;

TabItem.displayName = 'Tabs.Item';
