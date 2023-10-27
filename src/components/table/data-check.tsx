'use client';
import { Checkbox } from '../ui/checkbox';
import { Row } from '@tanstack/react-table';
import { useState } from 'react';
import { useToast } from '../ui/use-toast';
import { revalidateTagHelper } from '@/app/actions';
import { TodoItem } from '@/types/todo-item';
import { api } from '@/config/api';

interface DataCheckedProps {
  row: Row<TodoItem>;
}
export function DataCheck({ row }: DataCheckedProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const todoItem = row.original;

  async function handleCheck() {
    try {
      setIsLoading(true);
      const res = await api(
        `/items/${todoItem.id}/${todoItem.check ? 'undone' : 'done'}`,
        {
          method: 'PATCH',
        },
      );

      if (res.status === 204) {
        toast({
          title: `${row.original.name} ${
            todoItem.check ? 'unchecked' : 'checked'
          }`,
          variant: 'success',
        });

        setIsLoading(false);
        await revalidateTagHelper('items');
        return;
      }

      toast({
        title: 'Something went wrong',
        description: 'Try again later.',
        variant: 'error',
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Connection failed.',
        description:
          'Unable to connect to Tasks. Please check your connection.',
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      onClick={handleCheck}
      disabled={isLoading}
      aria-label="Check task"
    />
  );
}
