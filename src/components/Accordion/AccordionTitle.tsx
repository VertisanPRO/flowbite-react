'use client';

import { twMerge } from '@vertisanpro/tailwind-merge';
import type { ComponentProps, FC } from 'react';
import React from 'react';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import type { DeepPartial } from '../../types';
import type { FlowbiteBoolean, FlowbiteHeadingLevel } from '../Flowbite';
import { useAccordionContext } from './AccordionPanelContext';

export interface FlowbiteAccordionTitleTheme {
  arrow: {
    base: string;
    open: FlowbiteBoolean;
  };
  base: string;
  flush: FlowbiteBoolean;
  heading: string;
  open: FlowbiteBoolean;
}

export interface AccordionTitleProps extends ComponentProps<'button'> {
  arrowIcon?: FC<ComponentProps<'svg'>>;
  as?: FlowbiteHeadingLevel;
  theme?: DeepPartial<FlowbiteAccordionTitleTheme>;
}

export const AccordionTitle: FC<AccordionTitleProps> = ({
  as: Heading = 'h2',
  children,
  className,
  theme: customTheme = {},
  ...props
}) => {
  const { arrowIcon: ArrowIcon, flush, isOpen, setOpen } = useAccordionContext();
  const onClick = () => typeof setOpen !== 'undefined' && setOpen();

  const theme = mergeDeep(getTheme().accordion.title, customTheme);

  return (
    <button
      className={twMerge(theme.base, theme.flush[flush ? 'on' : 'off'], theme.open[isOpen ? 'on' : 'off'], className)}
      onClick={onClick}
      type="button"
      {...props}
    >
      <Heading className={theme.heading} data-testid="flowbite-accordion-heading">
        {children}
      </Heading>
      {ArrowIcon && (
        <ArrowIcon
          aria-hidden
          className={twMerge(theme.arrow.base, theme.arrow.open[isOpen ? 'on' : 'off'])}
          data-testid="flowbite-accordion-arrow"
        />
      )}
    </button>
  );
};
