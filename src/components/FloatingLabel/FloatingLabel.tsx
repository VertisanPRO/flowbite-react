import { twMerge } from '@vertisanpro/tailwind-merge';
import { nanoid } from 'nanoid';
import type { ComponentPropsWithoutRef } from 'react';
import React, { forwardRef, useMemo } from 'react';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import type { DeepPartial } from '../../types';
import type { FlowbiteFloatingLabelTheme } from './theme';

export type FloatingLabelColor = 'default' | 'success' | 'error';
export type FloatingLabelSizing = 'sm' | 'md';
export type FloatingLabelVariant = 'filled' | 'outlined' | 'standard';

export interface FloatingLabelProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  helperText?: string;
  color?: FloatingLabelColor;
  sizing?: FloatingLabelSizing;
  variant: FloatingLabelVariant;
  disabled?: boolean;
  theme?: DeepPartial<FlowbiteFloatingLabelTheme>;
}

export const FloatingLabel = forwardRef<HTMLInputElement, FloatingLabelProps>(
  (
    {
      label,
      helperText,
      color = 'default',
      sizing = 'md',
      variant,
      disabled = false,
      theme: customTheme = {},
      className,
      ...props
    },
    ref,
  ) => {
    const randomId = useMemo(() => nanoid(), []);
    const theme = mergeDeep(getTheme().floatingLabel, customTheme);

    return (
      <div>
        <div className={twMerge('relative', variant === 'standard' ? 'z-0' : '')}>
          <input
            type="text"
            id={props.id ? props.id : 'floatingLabel' + randomId}
            aria-describedby="outlined_success_help"
            className={twMerge(theme.input[color][variant][sizing], className)}
            placeholder=" "
            data-testid="floating-label"
            disabled={disabled}
            {...props}
            ref={ref}
          />
          <label
            htmlFor={props.id ? props.id : 'floatingLabel' + randomId}
            className={twMerge(theme.label[color][variant][sizing], className)}
          >
            {label}
          </label>
        </div>
        <p id={'outlined_helper_text' + randomId} className={twMerge(theme.helperText[color], className)}>
          {helperText}
        </p>
      </div>
    );
  },
);

FloatingLabel.displayName = 'FloatingLabel';
