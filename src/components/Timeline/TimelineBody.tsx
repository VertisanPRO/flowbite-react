'use client';

import { twMerge } from '@vertisanpro/tailwind-merge';
import type { ComponentProps, FC } from 'react';
import React from 'react';
import { mergeDeep } from '../../helpers/merge-deep';
import type { DeepPartial } from '../../types';
import { useTimelineContentContext } from './TimelineContentContext';

export interface FlowbiteTimelineBodyTheme {
  base: string;
}

export interface TimelineBodyProps extends ComponentProps<'p'> {
  theme?: DeepPartial<FlowbiteTimelineBodyTheme>;
}

export const TimelineBody: FC<TimelineBodyProps> = ({ children, className, theme: customTheme = {}, ...props }) => {
  const { theme: contentTheme } = useTimelineContentContext();

  const theme = mergeDeep(contentTheme.body, customTheme);

  return (
    <div className={twMerge(theme.base, className)} {...props}>
      {children}
    </div>
  );
};
