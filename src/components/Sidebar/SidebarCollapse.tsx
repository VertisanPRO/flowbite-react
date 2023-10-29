'use client';

import { nanoid } from 'nanoid';
import type { ComponentProps, FC, PropsWithChildren, ReactElement } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import type { DeepPartial } from '../../types';
import type { FlowbiteBoolean } from '../Flowbite';
import { Tooltip } from '../Tooltip';
import { useSidebarContext } from './SidebarContext';
import type { SidebarItemProps } from './SidebarItem';
import { SidebarItemContext } from './SidebarItemContext';

export interface FlowbiteSidebarCollapseTheme {
  button: string;
  icon: {
    base: string;
    open: FlowbiteBoolean;
  };
  label: {
    base: string;
    icon: {
      base: string;
      open: FlowbiteBoolean;
    };
  };
  list: string;
}

export interface SidebarCollapseProps
  extends PropsWithChildren<unknown>,
    Pick<SidebarItemProps, 'active' | 'as' | 'href' | 'icon' | 'label' | 'labelColor'>,
    ComponentProps<'button'> {
  onClick?: ComponentProps<'button'>['onClick'];
  open?: boolean;
  chevronIcon?: FC<ComponentProps<'svg'>>;
  renderChevronIcon?: (theme: DeepPartial<FlowbiteSidebarCollapseTheme>, open: boolean) => ReactElement;
  theme?: DeepPartial<FlowbiteSidebarCollapseTheme>;
}

export const SidebarCollapse: FC<SidebarCollapseProps> = ({
  children,
  className,
  icon: Icon,
  label,
  chevronIcon: ChevronIcon = HiChevronDown,
  renderChevronIcon,
  open = false,
  theme: customTheme = {},
  ...props
}) => {
  const id = useMemo(() => nanoid(), []);
  const { isCollapsed } = useSidebarContext();
  const [isOpen, setOpen] = useState(open);
  const theme = mergeDeep(getTheme().sidebar.collapse, customTheme);

  useEffect(() => setOpen(open), [open]);

  const Wrapper: FC<PropsWithChildren<unknown>> = ({ children }) => (
    <li>
      {isCollapsed && !isOpen ? (
        <Tooltip content={label} placement="right">
          {children}
        </Tooltip>
      ) : (
        children
      )}
    </li>
  );

  return (
    <Wrapper>
      <button
        id={`flowbite-sidebar-collapse-${id}`}
        onClick={() => setOpen(!isOpen)}
        title={label}
        type="button"
        className={twMerge(theme.button, className)}
        {...props}
      >
        {Icon && (
          <Icon
            aria-hidden
            data-testid="flowbite-sidebar-collapse-icon"
            className={twMerge(theme.icon.base, theme.icon.open[isOpen ? 'on' : 'off'])}
          />
        )}
        {isCollapsed ? (
          <span className="sr-only">{label}</span>
        ) : (
          <>
            <span data-testid="flowbite-sidebar-collapse-label" className={theme.label.base}>
              {label}
            </span>
            {renderChevronIcon ? (
              renderChevronIcon(theme, isOpen)
            ) : (
              <ChevronIcon
                aria-hidden
                className={twMerge(theme.label.icon.base, theme.label.icon.open[isOpen ? 'on' : 'off'])}
              />
            )}
          </>
        )}
      </button>
      <ul aria-labelledby={`flowbite-sidebar-collapse-${id}`} hidden={!isOpen} className={theme.list}>
        <SidebarItemContext.Provider value={{ isInsideCollapse: true }}>{children}</SidebarItemContext.Provider>
      </ul>
    </Wrapper>
  );
};

SidebarCollapse.displayName = 'Sidebar.Collapse';
