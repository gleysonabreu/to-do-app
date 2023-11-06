'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DataCheck } from './data-check';
import { TodoItem } from '@/types/todo-item';

export const columns: ColumnDef<TodoItem>[] = [
  {
    id: 'select',
    header: 'Status',
    cell: ({ row }) => <DataCheck row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    enableHiding: false,
    header: '#',
    cell: ({ row }) => (
      <div className="capitalize">
        {(row.getValue('id') as string).substring(0, 8)}
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'description',
    header: () => <div className="text-right">Description</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.getValue('description') || 'No description'}
        </div>
      );
    },
  },
];
