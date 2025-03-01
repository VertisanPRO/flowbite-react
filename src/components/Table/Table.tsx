'use client';

import { twMerge } from '@vertisanpro/tailwind-merge';
import type { ComponentProps, FC } from 'react';
import React from 'react';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import type { DeepPartial } from '../../types';
import { TableBody, type FlowbiteTableBodyTheme } from './TableBody';
import { TableCell } from './TableCell';
import { TableContext } from './TableContext';
import { TableHead, type FlowbiteTableHeadTheme } from './TableHead';
import { TableHeadCell } from './TableHeadCell';
import { TableRow, type FlowbiteTableRowTheme } from './TableRow';

export interface FlowbiteTableTheme {
  root: FlowbiteTableRootTheme;
  head: FlowbiteTableHeadTheme;
  row: FlowbiteTableRowTheme;
  body: FlowbiteTableBodyTheme;
}

export interface FlowbiteTableRootTheme {
  base: string;
  shadow: string;
  wrapper: string;
}

export interface TableProps extends ComponentProps<'table'> {
  striped?: boolean;
  hoverable?: boolean;
  theme?: DeepPartial<FlowbiteTableTheme>;
}

const TableComponent: FC<TableProps> = ({
  children,
  className,
  striped,
  hoverable,
  theme: customTheme = {},
  ...props
}) => {
  const theme = mergeDeep(getTheme().table, customTheme);

  return (
    <div data-testid="table-element" className={twMerge(theme.root.wrapper)}>
      <TableContext.Provider value={{ theme, striped, hoverable }}>
        <div className={twMerge(theme.root.shadow, className)}></div>
        <table className={twMerge(theme.root.base, className)} {...props}>
          {children}
        </table>
      </TableContext.Provider>
    </div>
  );
};

TableComponent.displayName = 'Table';
TableHead.displayName = 'Table.Head';
TableBody.displayName = 'Table.Body';
TableRow.displayName = 'Table.Row';
TableCell.displayName = 'Table.Cell';
TableHeadCell.displayName = 'Table.HeadCell';

export const Table = Object.assign(TableComponent, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  HeadCell: TableHeadCell,
});
