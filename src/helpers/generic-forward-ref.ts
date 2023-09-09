import type React from 'react';
import { forwardRef } from 'react';

/** This allow the `forwardRef` to be used with generic components */

// eslint-disable-next-line @typescript-eslint/ban-types
type FixedForwardRef = <T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactElement,
) => (props: P & React.RefAttributes<T>) => React.ReactElement;

const genericForwardRef = forwardRef as FixedForwardRef;

export default genericForwardRef;
