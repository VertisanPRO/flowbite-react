'use client';

import { twMerge } from '@vertisanpro/tailwind-merge';
import type { ComponentProps, FC } from 'react';
import React from 'react';
import { mergeDeep } from '../../helpers/merge-deep';
import type { DeepPartial } from '../../types';
import { TableBodyContext } from './TableBodyContext';
import type { FlowbiteTableCellTheme } from './TableCell';
import { useTableContext } from './TableContext';

export interface FlowbiteTableBodyTheme {
  base: string;
  cell: FlowbiteTableCellTheme;
}

export interface TableBodyProps extends ComponentProps<'tbody'> {
  theme?: DeepPartial<FlowbiteTableBodyTheme>;
}

export const TableBody: FC<TableBodyProps> = ({ children, className, theme: customTheme = {}, ...props }) => {
  const { theme: rootTheme } = useTableContext();

  const theme = mergeDeep(rootTheme.body, customTheme);

  return (
    <TableBodyContext.Provider value={{ theme }}>
      <tbody className={twMerge(theme.base, className)} {...props}>
        {children}
      </tbody>
    </TableBodyContext.Provider>
  );
};
