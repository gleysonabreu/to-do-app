'use client';

import { useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { fetchWithAuth } from '@/lib/fetcher';
import { useToast } from './ui/use-toast';
import { Delete, Loader2, MoreVerticalIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
} from './ui/alert-dialog';
import { revalidateTagHelper } from '@/app/actions';

type Item = {
  id: string;
  isChecked: boolean;
  name: string;
  description?: string;
};

export function Item({ isChecked, name, description, id }: Item) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [checked, setChecked] = useState(isChecked);
  const { toast } = useToast();

  async function handleCheck() {
    try {
      setIsLoading(true);
      const res = await fetchWithAuth(
        `/items/${id}/${checked ? 'undone' : 'done'}`,
        {
          method: 'PATCH',
        },
      );

      if (res.status === 204) {
        toast({
          title: `${name} ${checked ? 'unchecked' : 'checked'}`,
          variant: 'success',
        });

        setIsLoading(false);
        return;
      }

      console.log(res);
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

  async function handleDeleteTaskItem() {
    try {
      setIsLoadingDelete(true);
      const res = await fetchWithAuth(`/items/${id}`, {
        method: 'DELETE',
      });

      if (res.status === 204) {
        toast({
          title: `${name} deleted.`,
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
    <div
      data-checked={checked}
      className="w-full flex gap-3 justify-between items-center p-4  border rounded-lg bg-zinc-900 border-zinc-800 data-[checked=true]:bg-zinc-950 data-[checked=true]border-zinc-900"
    >
      <div className="flex items-center gap-3">
        <Checkbox
          id={id}
          checked={checked}
          disabled={isLoading}
          onClick={handleCheck}
          onCheckedChange={(checked) =>
            setChecked(checked === 'indeterminate' ? true : checked)
          }
        />
        <div className="flex gap-3 flex-col">
          <label
            data-checked={checked}
            htmlFor={id}
            className="data-[checked=true]:line-through data-[checked=true]:text-zinc-400 text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {name}
          </label>
          {description && (
            <span
              data-checked={checked}
              className="text-zinc-400 text-sm data-[checked=true]:line-through"
            >
              {description}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        {isLoading && <Loader2 className="animate-spin text-zinc-400" />}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="link" size="icon">
              <MoreVerticalIcon />
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
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
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
      </div>
    </div>
  );
}
