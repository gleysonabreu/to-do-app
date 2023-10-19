'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Row } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { Delete, Loader2, MoreHorizontal } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { TodoItem } from '@/app/(home)/dashboard/todos/[id]/page';
import { useState } from 'react';
import { fetchWithAuth } from '@/lib/fetcher';
import { useToast } from '../ui/use-toast';
import { revalidateTagHelper } from '@/app/actions';

interface DataTableRowActionsProps {
  row: Row<TodoItem>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const { toast } = useToast();

  const task = row.original;

  async function handleDeleteTaskItem() {
    try {
      setIsLoadingDelete(true);
      const res = await fetchWithAuth(`/items/${task.id}`, {
        method: 'DELETE',
      });

      if (res.status === 204) {
        toast({
          title: `${task.name} deleted.`,
          variant: 'success',
        });

        await revalidateTagHelper('items');
        setIsLoadingDelete(false);
        return;
      }

      toast({
        title: 'Something went wrong',
        description: 'Try again later.',
        variant: 'error',
      });
      setIsLoadingDelete(false);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Connection failed.',
        description:
          'Unable to connect to Tasks. Please check your connection.',
        variant: 'error',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" size="icon">
          <MoreHorizontal className="text-zinc-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Task item</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Delete className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your task item from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteTaskItem}>
                  {isLoadingDelete ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    'Continue'
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
