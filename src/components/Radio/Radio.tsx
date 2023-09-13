import type { ComponentProps } from 'react';
import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import type { DeepPartial } from '../../';
import { useTheme } from '../../';
import { mergeDeep } from '../../helpers/merge-deep';

export interface FlowbiteRadioTheme {
  root: FlowbiteRadioRootTheme;
}

export interface FlowbiteRadioRootTheme {
  base: string;
}

export interface RadioProps extends Omit<ComponentProps<'input'>, 'ref' | 'type'> {
  theme?: DeepPartial<FlowbiteRadioTheme>;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, theme: customTheme = {}, ...props }, ref) => {
    const theme = mergeDeep(useTheme().theme.radio, customTheme);

    return <input ref={ref} type="radio" className={twMerge(theme.root.base, className)} {...props} />;
  },
);

Radio.displayName = 'Radio';
