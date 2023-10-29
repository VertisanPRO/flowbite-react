import type { ComponentProps, FC, PropsWithChildren } from 'react';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import type { DeepPartial } from '../../types';
import type { FlowbiteHeadingLevel } from '../Flowbite';

export interface FlowbiteTimelineTitleTheme {
  title: string;
}

export interface TimelineTitleProps extends PropsWithChildren<unknown>, ComponentProps<'h1'> {
  as?: FlowbiteHeadingLevel;
  theme?: DeepPartial<FlowbiteTimelineTitleTheme>;
}

export const TimelineTitle: FC<TimelineTitleProps> = ({
  as: Tag = 'h3',
  children,
  className,
  theme: customTheme = {},
  ...props
}) => {
  const theme = mergeDeep(getTheme().timeline.item.content, customTheme).title;

  return (
    <Tag className={twMerge(theme, className)} {...props}>
      {children}
    </Tag>
  );
};
