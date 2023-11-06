'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Row } from '@tanstack/react-table';
import { TodoItem } from '@/types/todo-item';

interface DataCheckedProps {
  row: Row<TodoItem>;
}
export function DataCheck({ row }: DataCheckedProps) {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      disabled
      aria-label="Check task"
    />
  );
}
